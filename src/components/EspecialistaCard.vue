<template>
  <v-card class="mx-auto" max-width="320" elevation="2">
    <v-card-text class="d-flex flex-column align-center justify-center py-4">
      <v-avatar size="100" class="elevated-avatar mb-3">
        <v-img :src="data.foto" cover />
      </v-avatar>
      <div class="text-center">
        <div class="text-h6 font-weight-bold">{{ data.nombre }}</div>
        <div class="text-body-2 text-grey-darken-1">{{ data.especialidad }}</div>
      </div>
    </v-card-text>
    <v-divider class="my-2" />

    <v-card-actions>
      <v-btn color="primary" @click="$emit('agendar', data)">Agendar cita</v-btn>
      <v-spacer />
      <v-btn variant="text" @click="$emit('ver-perfil', data)">Ver perfil</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({ data: Object })
</script>

<style scoped>
.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.elevated-avatar {
  border: 3px solid #e1bee7;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>
