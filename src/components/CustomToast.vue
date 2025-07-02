<template>
  <v-snackbar v-model="visible" :timeout="2500" :color="color" class="rounded-pill px-4 text-white">
    <template #default>
      <v-icon start>{{ icon }}</v-icon>
      {{ message }}
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: String,
  color: String,
  icon: String,
  onClose: Function
})

const visible = ref(false)

onMounted(() => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
    if (props.onClose) props.onClose()
  }, 2500)
})
</script>
