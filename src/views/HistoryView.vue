<template>
  <v-container class="py-10">
    <h2 class="text-h4 font-weight-bold mb-6 text-center text-primary">Historial de Compras</h2>

    <!-- Filtros -->
    <v-row class="mb-6" dense>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filtroNombre"
          label="Buscar producto"
          prepend-inner-icon="mdi-magnify"
          clearable
        />
      </v-col>
      <v-col cols="6" md="4">
        <v-text-field
          v-model="fechaInicio"
          type="date"
          label="Desde"
        />
      </v-col>
      <v-col cols="6" md="4">
        <v-text-field
          v-model="fechaFin"
          type="date"
          label="Hasta"
        />
      </v-col>
    </v-row>

    <!-- Historial -->
    <v-expansion-panels v-if="filtrado.length">
      <v-expansion-panel v-for="(compra, index) in filtrado" :key="index">
        <v-expansion-panel-title>
          <div class="d-flex justify-space-between w-100 align-center">
            <div>
              <strong>{{ compra.usuario || 'Usuario desconocido' }}</strong> — 
              {{ formatDate(compra.fecha) }}
            </div>
            <span class="font-weight-bold">Total: S/ {{ compra.totalPagado }}</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p><strong>Monto base:</strong> S/ {{ compra.montoBase }}</p>
          <p v-if="compra.donacion > 0"><strong>Donación:</strong> S/ {{ compra.donacion }}</p>

          <v-divider class="my-4" />

          <p class="font-weight-medium mb-3">🛍 Productos comprados:</p>
          <v-row dense>
            <v-col
              v-for="(prod, i) in compra.productos"
              :key="i"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="pa-3 rounded-lg elevation-1" color="#fffafc">
                <div class="d-flex align-center">
                  <v-avatar size="56" class="me-3">
                    <v-img :src="prod.imagen" />
                  </v-avatar>
                  <div>
                    <div class="text-body-1 font-weight-medium">{{ prod.nombre }}</div>
                    <div class="text-caption">S/ {{ prod.precio }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-alert v-else type="info" border="start" class="mt-4">
      No se encontraron compras con los filtros aplicados.
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { readFromStorage } from '@/services/dataService'

const historial = ref([])
const filtroNombre = ref('')
const fechaInicio = ref('')
const fechaFin = ref('')

// Al montar, obtenemos el historial y el nombre del usuario (si existe)
onMounted(() => {
  const compras = readFromStorage('historial_compras') || []
  const usuario = readFromStorage('usuario')?.nombre || 'Usuario desconocido'
  historial.value = compras.map(c => ({ ...c, usuario }))
})

function formatDate(fechaISO) {
  const fecha = new Date(fechaISO)
  return fecha.toLocaleString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

// Filtro combinado
const filtrado = computed(() => {
  return historial.value.filter(compra => {
    const cumpleNombre = filtroNombre.value
      ? compra.productos.some(p =>
          p.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
        )
      : true

    const fechaCompra = new Date(compra.fecha)
    const desde = fechaInicio.value ? new Date(fechaInicio.value) : null
    const hasta = fechaFin.value ? new Date(fechaFin.value) : null

    const cumpleFecha =
      (!desde || fechaCompra >= desde) &&
      (!hasta || fechaCompra <= hasta)

    return cumpleNombre && cumpleFecha
  })
})
</script>
