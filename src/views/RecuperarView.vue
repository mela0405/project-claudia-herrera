<template>
  <v-container fluid class="fill-height recuperar-background">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-6 rounded-xl elevation-12" color="white">

          <!-- Logo y título -->
          <div class="text-center mb-6">
            <v-img src="/img/logo.png" max-width="120" class="mx-auto" />
            <h2 class="mt-2 font-weight-bold">¿Olvidaste tu contraseña?</h2>
            <p class="text-subtitle-2">Te enviaremos instrucciones a tu correo</p>
          </div>

          <!-- Formulario -->
          <v-form @submit.prevent="recuperar">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              prepend-inner-icon="mdi-email"
              type="email"
              required
              class="mb-4"
            />

            <v-btn color="primary" block type="submit" class="mb-2">
              Enviar instrucciones
            </v-btn>

            <!-- Volver al login -->
            <div class="text-center mt-4">
              <span>¿Recordaste tu contraseña?</span>
              <v-btn text color="secondary" @click="router.push('/login')">
                Inicia sesión
              </v-btn>
            </div>
          </v-form>

          <v-snackbar v-model="snackbar" color="success" timeout="3000">
            Instrucciones enviadas al correo.
          </v-snackbar>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const snackbar = ref(false)
const router = useRouter()

function recuperar() {
  if (email.value) {
    snackbar.value = true
    // En un sistema real: aquí iría el envío del correo
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } else {
    alert('Ingresa un correo válido.')
  }
}
</script>

<style scoped>
.recuperar-background {
  background: linear-gradient(to bottom, #fef9e7, #fdebd0);
}
</style>
