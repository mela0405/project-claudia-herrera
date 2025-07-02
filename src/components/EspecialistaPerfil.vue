<template>
  <v-dialog v-model="dialog" max-width="650" scrollable>
    <v-card>
      <!-- Avatar centrado -->
      <v-card-text class="d-flex justify-center pt-6 pb-0">
        <v-avatar size="120" class="perfil-avatar">
          <v-img :src="especialista.foto" cover />
        </v-avatar>
      </v-card-text>

      <!-- Datos generales -->
      <v-card-title class="d-flex flex-column text-center py-2">
        <span class="text-h6 font-weight-bold">
          {{ especialista.nombre }}
        </span>
        <span class="text-subtitle-1 text-grey-darken-1">
          {{ especialista.especialidad }}
        </span>
      </v-card-title>

      <v-divider class="mx-4 mb-4" />

      <!-- Descripción -->
      <v-card-text class="px-6">
        <h4 class="text-subtitle-1 font-weight-medium mb-2">Sobre mí</h4>
        <p class="text-body-2 mb-4">{{ especialista.descripcion }}</p>

        <h4 class="text-subtitle-1 font-weight-medium mb-2">Contáctame</h4>
        <v-row justify="center" align="center" class="mb-2">
          <v-btn
            icon
            v-if="especialista.instagram"
            :href="especialista.instagram"
            target="_blank"
            class="mx-2"
          >
            <v-icon size="24">mdi-instagram</v-icon>
          </v-btn>
          <v-btn
            icon
            v-if="especialista.whatsapp"
            :href="`https://wa.me/${especialista.whatsapp}`"
            target="_blank"
            class="mx-2"
          >
            <v-icon size="24">mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn
            icon
            v-if="especialista.email"
            :href="`mailto:${especialista.email}`"
            target="_blank"
            class="mx-2"
          >
            <v-icon size="24">mdi-email</v-icon>
          </v-btn>
        </v-row>

        <div v-if="especialista.telefono" class="text-center text-caption mt-2">
          <v-icon size="18" class="me-1">mdi-phone</v-icon>
          {{ especialista.telefono }}
        </div>
      </v-card-text>

      <v-card-actions class="justify-end px-6 pb-4">
        <v-btn variant="text" @click="dialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dialog: Boolean,
  especialista: Object,
})

const emit = defineEmits(['update:dialog'])

const dialog = ref(props.dialog)

watch(() => props.dialog, (val) => (dialog.value = val))
watch(dialog, (val) => emit('update:dialog', val))
</script>

<style scoped>
.perfil-avatar {
  border: 4px solid #f8bbd0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
