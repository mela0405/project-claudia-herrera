<template>
  <v-container class="py-10">
    <h2 class="text-h4 font-weight-bold mb-6 text-center text-primary">
      Productos en Venta
    </h2>

    <v-row>
      <v-col
        v-for="producto in productos"
        :key="producto.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :data="producto" @add="agregarAlCarrito(producto)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { readTxtFile, writeToStorage, readFromStorage } from '@/services/dataService'

const productos = ref([])

onMounted(async () => {
  productos.value = await readTxtFile('/data/productos.txt')
})

function agregarAlCarrito(producto) {
  const carrito = readFromStorage('carrito') || []
  carrito.push(producto)
  writeToStorage('carrito', carrito)
}
</script>
