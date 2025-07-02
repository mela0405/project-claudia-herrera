<template>
  <v-container class="py-10">
    <h2 class="text-h4 font-weight-bold mb-6 text-center text-primary">Mi Perfil</h2>

    <v-card class="pa-6 rounded-xl" elevation="2">
      <v-row align="center" justify="center" class="mb-6">
        <v-col cols="12" md="4" class="text-center">
          <v-avatar size="120" class="mx-auto elevation-4">
            <v-img :src="perfil.foto || defaultAvatar" />
          </v-avatar>

          <v-file-input
            label="Cambiar foto"
            prepend-icon="mdi-camera"
            accept="image/*"
            show-size
            hide-details
            density="compact"
            class="mt-3"
            @change="onFileChange"
          />
        </v-col>
      </v-row>

      <!-- Datos del perfil -->
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="perfil.nombre"
            label="Nombre completo"
            prepend-inner-icon="mdi-account"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="perfil.email"
            label="Correo electrónico"
            prepend-inner-icon="mdi-email"
          />
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <v-row justify="space-between">
        <v-col cols="12" md="6">
          <v-btn color="primary" @click="guardar" class="me-2">
            Guardar Cambios
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right text-start">
          <v-btn variant="outlined" color="secondary" @click="goToChangePassword">
            Cambiar contraseña
            <v-icon end>mdi-lock-reset</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { readFromStorage, writeToStorage } from '@/services/dataService'
import { useRouter } from 'vue-router'

const router = useRouter()
const defaultAvatar = '/img/avatar-default.svg'
const perfil = ref({ nombre: '', email: '', foto: '' })

onMounted(() => {
  perfil.value = readFromStorage('usuario') || { nombre: '', email: '', foto: '' }
})

function guardar() {
  writeToStorage('usuario', perfil.value)
  alert('Perfil actualizado con éxito')
}

function goToChangePassword() {
  router.push('/cambiar-password')
}

function onFileChange(file) {
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    perfil.value.foto = e.target.result
  }
  reader.readAsDataURL(file)
}
</script>
