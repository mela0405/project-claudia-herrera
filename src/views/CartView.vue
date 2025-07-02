<template>
  <v-container class="py-10">
    <h2 class="text-h4 font-weight-bold mb-6 text-center text-primary">Carrito de Compras</h2>

    <v-row v-if="carrito.length > 0" dense>
      <v-col
        v-for="(item, index) in carrito"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="mb-4 rounded-xl" elevation="2">
          <v-row no-gutters>
            <!-- Imagen -->
            <v-col cols="4">
              <v-img
                :src="item.imagen"
                height="100%"
                cover
                class="rounded-s-xl"
              />
            </v-col>

            <!-- Detalles -->
            <v-col cols="8" class="pa-3">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <h3 class="text-subtitle-1 font-weight-medium mb-1">
                    {{ item.nombre }}
                  </h3>
                  <p class="text-body-2 mb-0">S/ {{ item.precio }}</p>
                </div>
                <v-btn icon @click="remover(index)">
                  <v-icon color="red-darken-2">mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Total y botón de finalizar compra -->
    <v-row v-if="carrito.length > 0" class="mt-6">
      <v-col cols="12" md="6" offset-md="6">
        <v-card class="pa-6 rounded-xl elevation-2" color="#fffafc">
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-subtitle-1 font-weight-medium">Total:</span>
            <span class="text-h6 font-weight-bold text-pink">S/ {{ total }}</span>
          </div>
          <v-divider class="mb-4" />
          <v-btn
            color="pink-darken-1"
            block
            class="font-weight-bold"
            size="large"
            @click="finalizarCompra"
          >
            Finalizar compra
            <v-icon end>mdi-credit-card</v-icon>
          </v-btn>
        </v-card>
</v-col>

    </v-row>

        <!-- Carrito vacío -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-icon size="60" color="grey lighten-1" class="mb-4">mdi-cart-off</v-icon>
        <p class="text-subtitle-1">Tu carrito está vacío.</p>
        <v-btn color="primary" @click="$router.push('/tienda')">Explorar Tienda</v-btn>
      </v-col>
    </v-row>
  </v-container>

    <!-- Modal: Preguntar si desea donar -->
  <v-dialog v-model="modalDonar" max-width="480">
    <v-card>
      <v-card-title class="font-weight-bold">
        ✨ ¿Deseas apoyar con una donación?
      </v-card-title>
      <v-card-text>
        <p class="mb-4 text-body-2">
          Tu aporte impulsa capacitaciones, tratamientos gratuitos y proyectos que empoderan a mujeres a través de la asociación <strong>U-Manos</strong>.
        </p>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="grey" text @click="confirmarCompra(false)">No, gracias</v-btn>
        <v-btn color="pink" variant="flat" @click="mostrarSeleccion = true; modalDonar = false">Sí, deseo donar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Modal: Selección de porcentaje -->
  <v-dialog v-model="mostrarSeleccion" max-width="460">
    <v-card>
      <v-card-title class="font-weight-bold">Selecciona un porcentaje de donación</v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-btn
            v-for="p in porcentajes"
            :key="p"
            color="pink lighten-2"
            class="ma-2"
            @click="elegirPorcentaje(p)"
          >
            {{ p }}%
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Modal: Confirmar total final -->
  <v-dialog v-model="modalResumen" max-width="500">
    <v-card>
      <v-card-title class="font-weight-bold">Resumen de compra</v-card-title>
      <v-card-text>
        <p class="mb-2">Total original: <strong>S/ {{ total }}</strong></p>
        <p v-if="donacionExtra > 0">Donación adicional: <strong>S/ {{ donacionExtra }}</strong></p>
        <p class="mt-3">Total a pagar: <span class="text-h6 font-weight-bold text-success">S/ {{ totalFinal }}</span></p>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="grey" text @click="modalResumen = false">Cancelar</v-btn>
        <v-btn color="green-darken-1" @click="procesarCompra">Confirmar compra</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar -->
  <v-snackbar v-model="snackbar" color="success" timeout="4000">
    ¡Gracias por tu compra y donación!
  </v-snackbar>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { readFromStorage, writeToStorage } from '@/services/dataService'

const modalDonar = ref(false)
const mostrarSeleccion = ref(false)
const modalResumen = ref(false)
const snackbar = ref(false)

const totalFinal = ref(0)
const donacionExtra = ref(0)

const porcentajes = [10, 15, 20, 25]

const carrito = ref([])

onMounted(() => {
  carrito.value = readFromStorage('carrito') || []
})

const total = computed(() =>
  carrito.value.reduce((acc, item) => acc + item.precio, 0)
)

function remover(index) {
  carrito.value.splice(index, 1)
  writeToStorage('carrito', carrito.value)
}

function finalizarCompra() {
  modalDonar.value = true
}

function confirmarCompra(deseaDonar) {
  modalDonar.value = false // cerrar el modal de pregunta

  if (!deseaDonar) {
    donacionExtra.value = 0
    totalFinal.value = total.value.toFixed(2)
    modalResumen.value = true
  }
}

function elegirPorcentaje(p) {
  donacionExtra.value = +(total.value * (p / 100)).toFixed(2)
  totalFinal.value = (total.value + donacionExtra.value).toFixed(2)
  mostrarSeleccion.value = false
  modalResumen.value = true
}

function procesarCompra() {
  const historial = readFromStorage('historial_compras') || []

  historial.push({
    fecha: new Date().toISOString(),
    montoBase: total.value,
    donacion: donacionExtra.value,
    totalPagado: totalFinal.value,
    productos: [...carrito.value],
  })

  writeToStorage('historial_compras', historial)

  carrito.value = []
  writeToStorage('carrito', [])
  modalResumen.value = false
  snackbar.value = true
}


</script>
