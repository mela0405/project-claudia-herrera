<template>
  <v-container fluid class="fill-height register-background">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-6 rounded-xl elevation-12" color="white">

          <!-- Logo -->
          <div class="text-center mb-6">
            <v-img src="/img/logo.png" max-width="120" class="mx-auto" />
            <h2 class="mt-2 font-weight-bold">Registrarse</h2>
            <p class="text-subtitle-2">Crea una cuenta para reservar tus citas</p>
          </div>

          <!-- Formulario -->
          <v-form @submit.prevent="register">
            <v-text-field
              v-model="nombre"
              label="Nombre completo"
              prepend-inner-icon="mdi-account"
              required
              class="mb-4"
            />
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              prepend-inner-icon="mdi-email"
              type="email"
              required
              class="mb-4"
            />
            <v-text-field
              v-model="password"
              label="Contraseña"
              prepend-inner-icon="mdi-lock"
              type="password"
              required
              class="mb-4"
            />

            <v-btn color="primary" block type="submit" class="mb-2">
              Registrarme
            </v-btn>

            <!-- Volver al login -->
            <div class="text-center mt-4">
              <span>¿Ya tienes una cuenta?</span>
              <v-btn text color="secondary" @click="router.push('/login')">
                Inicia sesión
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { writeToStorage, readFromStorage } from '@/services/dataService'

const router = useRouter()

const nombre = ref('')
const email = ref('')
const password = ref('')

onMounted(() => {
  const usuario = readFromStorage('usuario')
  if (usuario) router.push('/especialistas')
})

function register() {
  if (nombre.value && email.value && password.value) {
    const usuario = {
      nombre: nombre.value,
      email: email.value
    }
    writeToStorage('usuario', usuario)
    router.push('/especialistas')
  } else {
    alert('Completa todos los campos.')
  }
}
</script>

<style scoped>
.register-background {
  background: linear-gradient(to bottom, #eef6f9, #e5e8fc);
}
</style>
