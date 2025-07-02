<template>
  <!-- App bar principal -->
  <v-app-bar app color="#f884be" dark flat class="nav-with-divider">

    <!-- Logo + Nombre -->
    <v-btn icon @click="$router.push('/')" class="ms-4 me-2">
    <v-avatar size="48" color="white">
        <v-img src="/img/logo.png" />
    </v-avatar>
    </v-btn>
    <v-toolbar-title class="font-weight-bold text-white ">
      Claudia Herrera
    </v-toolbar-title>
    <v-spacer />

    <!-- Menú de navegación -->
    <v-btn variant="text" class="mx-1 text-white" @click="$router.push('/especialistas')">
      Especialistas
    </v-btn>
    <v-divider vertical class="divider-visible mx-3" />
    <v-btn variant="text" class="mx-1 text-white" @click="$router.push('/tienda')">
      Tienda
    </v-btn>
    <v-divider vertical class="divider-visible mx-3" />
    <v-btn variant="text" class="mx-1 text-white" @click="$router.push('/donaciones')">
      Donar
    </v-btn>

    <v-divider vertical class="divider-visible mx-3" />

    <!-- Icono de carrito -->
    <v-btn icon class="mx-1" @click="$router.push('/carrito')">
      <v-icon color="white">mdi-cart</v-icon>
    </v-btn>

    <v-divider vertical class="divider-visible mx-3" />

    <v-menu v-if="usuario" transition="scale-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>{{ usuario.nombre }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/perfil')">
          <v-list-item-title>Mi perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/historial')">
          <v-list-item-title>Historial de Compras</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-else text @click="$router.push('/login')">Login</v-btn>

  </v-app-bar>

  <!-- Línea horizontal inferior de la navbar -->
  <v-divider color="#ffffff33" thickness="1" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { readFromStorage, removeFromStorage } from '@/services/dataService'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref(null)

onMounted(() => {
  usuario.value = readFromStorage('usuario')
})

function logout() {
  removeFromStorage('usuario')
  usuario.value = null
  router.push('/login')
}
</script>

<style scoped>
.divider-visible {
  border-color: rgba(65, 8, 49);
  height: 28px;
  align-self: center;
}

.cursor-pointer {
  cursor: pointer;
}

</style>