<template>
  <v-container fluid class="py-12 background">
    
    <!-- Logo y Bienvenida -->
    <v-row justify="center" class="text-center mb-4">
      <v-col cols="12" md="6">
        <v-img src="/img/logo.png" max-width="120" class="mx-auto mb-3" />
        <h1 class="text-h4 font-weight-bold mb-1">Bienvenido a <span class="text-primary">Claudia Herrera</span></h1>
        <p class="text-subtitle-1">Donde tu belleza florece con confianza.</p>
      </v-col>
    </v-row>

    <!-- Video y Sobre Nosotros -->
    <v-row align="center" class="mt-10 px-4">
      
      <!-- Video -->
      <v-col cols="12" md="6" class="mb-6 mb-md-0">
        <div class="video-container">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/hlDabCyVRQQ"
            title="Video de bienvenida"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </v-col>

      <!-- Sobre nosotros -->
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-bold mb-3">Sobre Nosotros</h2>
        <p class="text-body-1">
          En <strong>Claudia Herrera</strong>, somos más que una boutique de belleza. Ofrecemos experiencias transformadoras en estética,
          cuidado personal y bienestar integral. Nuestro equipo de especialistas trabaja con pasión para ayudarte
          a sentirte y verte increíble cada día. 🌸
        </p>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
// No requiere lógica en este punto
</script>

<style scoped>

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
