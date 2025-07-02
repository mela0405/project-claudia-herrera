<template>
  <v-app>
    <Navbar v-if="showLayout" />
    <v-main>
      <router-view />
      <GlobalToast ref="toastRef" />
    </v-main>
    <Footer v-if="showLayout" />
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import GlobalToast from '@/components/GlobalToast.vue'

const route = useRoute()
const toastRef = ref()

const showLayout = computed(() => {
  return !['login', 'registro', 'cambiarpassword', 'recuperarpassword'].includes(route.name?.toLowerCase())
})
</script>
