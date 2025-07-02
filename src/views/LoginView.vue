<template>
  <v-container fluid class="fill-height login-background">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-6 rounded-xl elevation-12" color="white">

          <!-- Logo -->
          <div class="text-center mb-6">
            <v-img src="/img/logo.png" max-width="120" class="mx-auto" />
            <h2 class="mt-2 font-weight-bold">Iniciar sesión</h2>
            <p class="text-subtitle-2">Bienvenida a Claudia Herrera</p>
          </div>

          <!-- Formulario -->
          <v-form @submit.prevent="login">
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

            <div class="text-end mb-4">
            <v-btn variant="text" color="primary" @click="router.push('/recuperar-password')" class="text-caption px-0">
                ¿Olvidaste tu contraseña?
            </v-btn>
            </div>

            <v-btn color="primary" block type="submit" class="mb-2">
              Iniciar sesión
            </v-btn>

            <!-- Botón para registrarse -->
            <div class="text-center mt-4">
              <span>¿No tienes cuenta?</span>
              <v-btn text color="secondary" @click="router.push('/registro')">
                Regístrate aquí
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
import { writeToStorage, readFromStorage, verifyUser } from '@/services/dataService'

const email = ref('')
const password = ref('')
const router = useRouter()

onMounted(() => {
  const usuario = readFromStorage('usuario')
  if (usuario) router.push('/home')
})

async function login() {
  const usuario = await verifyUser(email.value, password.value)
  if (usuario) {
    writeToStorage('usuario', usuario)
    router.push('/home')
  } else {
    alert('Credenciales incorrectas.')
  }
}
</script>

<style scoped>
.login-background {
  background: linear-gradient(to bottom, #fdf0f0, #f7e3ec);
}
</style>
