<template>
  <v-card class="rounded-xl transition-card" elevation="3" max-width="320">    <!-- Imagen del producto -->
    <v-img       
      :src="data.imagen"
      height="180"
      cover
      class="rounded-t-xl"
      alt="Imagen del producto">
    <template #placeholder />
    <div class="etiquetas">
        <v-chip
        v-for="(etq, i) in data.etiquetas"
        :key="i"
        size="small"
        color="pink-darken-1"
        text-color="white"
        variant="elevated"
        class="me-2 mb-2 font-weight-medium text-uppercase tracking-wide"
        style="letter-spacing: 0.5px;"
        >
        <v-icon start size="16" class="me-1">mdi-star</v-icon>
        {{ etq }}
        </v-chip>
    </div>
    </v-img>

    <!-- Contenido -->
    <v-card-text class="py-4 px-4">
      <div class="text-subtitle-1 font-weight-bold mb-1">{{ data.nombre }}</div>
      <div class="text-body-2 text-grey-darken-1 mb-2">{{ data.descripcion }}</div>
      <div class="text-body-1 font-weight-bold text-primary">S/ {{ data.precio.toFixed(2) }}</div>
    </v-card-text>




    <v-divider class="mx-4" />
    <!-- Acción -->
     <v-card-actions class="px-4 pb-4">
      <v-btn color="secondary" block @click="agregarAlCarrito">
        Agregar al carrito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

import { useGlobalToast } from '@/composables/useGlobalToast'
const { show } = useGlobalToast()
const props = defineProps({ data: Object })
const emit = defineEmits(['add'])

function agregarAlCarrito() {
  emit('add')
  show(`"${props.data.nombre}" agregado al carrito`)
}

</script>

<style scoped>  

.etiquetas {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-wrap: wrap;
}

.transition-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.transition-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

</style>


