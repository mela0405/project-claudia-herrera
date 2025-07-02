<template>
  <v-snackbar
    v-model="visible"
    :timeout="2500"
    :color="color"
    location="top right"
    class="rounded-pill px-4 text-white"
  >
    <v-icon start class="me-2">{{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const color = ref('success')
const icon = ref('mdi-check-circle')

function showToast(m, c = 'pink-darken-2', i = 'mdi-check-circle') {
  message.value = m
  color.value = c
  icon.value = i
  visible.value = true
}

// Exponemos la función globalmente
defineExpose({ showToast })
</script>
