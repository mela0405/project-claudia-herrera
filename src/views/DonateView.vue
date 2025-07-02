<template>
  <v-container class="py-10">
  <!-- Título de la campaña con gancho emocional -->
  <v-row justify="center" class="mb-6">
    <v-col cols="12" md="8" class="text-center">
      <v-img src="/img/donacion.avif" height="220" cover class="rounded-xl mb-4" />
      <h2 class="text-h4 font-weight-bold text-pink-darken-2 mb-2">
        ✨ Belleza que Transforma ✨
      </h2>
      <p class="text-body-1 text-grey-darken-1">
        Una campaña solidaria de <strong>Claudia Herrera</strong> en alianza con <strong>U-MANOS</strong>,
        para empoderar a mujeres a través de la belleza.
      </p>
      <p class="text-body-2 mt-3">
        Tus donaciones financian talleres, productos, tratamientos y apoyo a mujeres emprendedoras en situación vulnerable.
      </p>
      <v-divider class="my-4" />
      <p class="text-subtitle-2 font-italic text-pink-darken-3">
        ¡Juntas construimos un futuro más bello y lleno de oportunidades!
      </p>
      <p class="text-caption mt-1">#MujeresQueInspiran #BellezaConPropósito</p>
    </v-col>
  </v-row>

  <!-- Sección de impacto acumulado -->
  <v-row justify="center" class="mt-6 mb-8">
    <v-col cols="12" md="10">
      <v-sheet
        elevation="1"
        rounded
        color="#fff0f5"
        class="pa-6 text-center"
      >
        <h3 class="text-h6 font-weight-bold text-pink-darken-2 mb-4">
          Impacto logrado gracias a tu ayuda
        </h3>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="6" md="4" class="mb-4">
            <v-icon size="36" color="pink-darken-1" class="mb-2">mdi-cash-multiple</v-icon>
            <div class="text-subtitle-1 font-weight-medium">
              S/ {{ montoTotalDonado }}
            </div>
            <div class="text-caption text-grey-darken-1">
              Recaudado hasta hoy
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4" class="mb-4">
            <v-icon size="36" color="pink-darken-1" class="mb-2">mdi-account-group</v-icon>
            <div class="text-subtitle-1 font-weight-medium">
              {{ mujeresApoyadas }}
            </div>
            <div class="text-caption text-grey-darken-1">
              Mujeres beneficiadas
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4" class="mb-4">
            <v-icon size="36" color="pink-darken-1" class="mb-2">mdi-calendar-check</v-icon>
            <div class="text-subtitle-1 font-weight-medium">
              {{ totalDonaciones }}
            </div>
            <div class="text-caption text-grey-darken-1">
              Donaciones realizadas
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>



  <!-- Botón principal -->
  <v-row justify="center">
    <v-btn color="pink-darken-1" size="large" @click="dialog = true">
      Quiero apoyar esta causa
      <v-icon end>mdi-heart</v-icon>
    </v-btn>
  </v-row>

    <!-- Modal de opciones de donación -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold text-pink-darken-2">
          ¿Cómo deseas donar?
        </v-card-title>
        <v-divider />

        <v-card-text>
          <v-tabs v-model="tab" color="pink-darken-1" align-tabs="center">
            <v-tab value="qr">Donar con QR</v-tab>
            <v-tab value="form">Formulario</v-tab>
          </v-tabs>

          <v-window v-model="tab" class="mt-4">
            <!-- Opción 1: QR -->
            <v-window-item value="qr">
              <v-img src="/img/qr.jpg" max-width="250" class="mx-auto mb-4" />
              <p class="text-caption text-center mb-2">Código QR oficial de Claudia Herrera</p>
              <v-img src="/img/u-manos.png" max-width="120" class="mx-auto mb-4" />
              <p class="text-body-2 mb-4">
                Puedes escanear el código QR o dejar tus datos para que una especialista se comunique contigo. ¡Toda ayuda suma!
              </p>
            </v-window-item>

            <!-- Opción 2: Formulario -->
            <v-window-item value="form">
              <v-text-field
                v-model="nombre"
                label="Nombre"
                prepend-inner-icon="mdi-account"
                class="mb-3"
              />
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                prepend-inner-icon="mdi-email"
                class="mb-3"
              />
              <v-text-field
                v-model="monto"
                label="Monto que desea donar (S/)"
                type="number"
                prepend-inner-icon="mdi-currency-usd"
                class="mb-3"
              />
              <v-btn color="success" block @click="enviarFormulario">
                Enviar solicitud de donación
              </v-btn>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-actions class="justify-end px-4 pb-4">
          <v-btn variant="text" @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { readFromStorage, writeToStorage, readTxtFile} from '@/services/dataService'

const dialog = ref(false)
const tab = ref('qr')

const monto = ref(0)
const nombre = ref('')
const email = ref('')

const montoTotalDonado = ref(0)
const totalDonaciones = ref(0)
const mujeresApoyadas = ref(0)

onMounted(async () => {
  const yaExiste = readFromStorage('donaciones')
  if (!yaExiste || yaExiste.length === 0) {
    const donaciones = await readTxtFile('/data/donaciones.txt')
    writeToStorage('donaciones', donaciones)
  }
  actualizarMetricas()
})

function actualizarMetricas() {
  const historial = readFromStorage('donaciones') || []
  montoTotalDonado.value = historial.reduce((acc, don) => acc + (don.monto || 0), 0)
  totalDonaciones.value = historial.length
  mujeresApoyadas.value = Math.floor(montoTotalDonado.value / 100)
}

function enviarFormulario() {
  if (!nombre.value || !email.value || !monto.value) {
    alert('Por favor completa todos los campos.')
    return
  }

  const historial = readFromStorage('donaciones') || []
  historial.push({
    tipo: 'formulario',
    nombre: nombre.value,
    email: email.value,
    monto: monto.value,
    fecha: new Date().toISOString()
  })

  writeToStorage('donaciones', historial)
  nombre.value = ''
  email.value = ''
  monto.value = 0
  dialog.value = false
  alert('Gracias por tu interés. Te contactaremos pronto ❤️')

  actualizarMetricas()
}
</script>

