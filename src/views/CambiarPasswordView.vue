<template>
  <v-container fluid class="fill-height cambiar-password-background">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-6 rounded-xl elevation-12" color="white">

          <!-- Logo y encabezado -->
          <div class="text-center mb-6">
            <v-img src="/img/logo.png" max-width="100" class="mx-auto" />
            <h2 class="mt-2 font-weight-bold">Cambiar contraseña</h2>
            <p class="text-subtitle-2">Ingresa tu nueva contraseña</p>
          </div>

          <!-- Formulario -->
          <v-form @submit.prevent="cambiarContrasena">
            <v-text-field
              v-model="nueva"
              label="Nueva contraseña"
              type="password"
              prepend-inner-icon="mdi-lock"
              required
              class="mb-4"
            />
            <v-text-field
              v-model="confirmar"
              label="Confirmar contraseña"
              type="password"
              prepend-inner-icon="mdi-lock-check"
              required
              class="mb-4"
            />

            <v-btn color="primary" block type="submit">
              Guardar nueva contraseña
            </v-btn>
          </v-form>

          <v-snackbar v-model="snackbar" color="success" timeout="1000">
            Contraseña actualizada exitosamente.
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nueva = ref('')
const confirmar = ref('')
const snackbar = ref(false)

function cambiarContrasena() {
  if (nueva.value && confirmar.value && nueva.value === confirmar.value) {
    snackbar.value = true

    nueva.value = ''
    confirmar.value = ''
  } else {
    alert('Las contraseñas no coinciden o están vacías.')
  }
}

watch(snackbar, (val) => {
  if (!val) {
    router.push('/perfil')
  }
})
</script>


<style scoped>
.cambiar-password-background {
  background: linear-gradient(to bottom, #f2f6ff, #e6ebf5);
}
</style>
