<template>
  <v-footer app padless class="footer-background">
    <v-container class="py-4">
      <v-row align="center" justify="space-between">
        <!-- Texto -->
        <v-col cols="12" sm="6" class="text-sm-left text-center mb-2 mb-sm-0">
          <span class="text-caption font-weight-medium">
            © {{ year }} Claudia Herrera – Arequipa, Perú
          </span>
        </v-col>

        <!-- Redes sociales -->
        <v-col cols="12" sm="6" class="text-sm-right text-center">
          <v-btn
            icon
            href="https://www.instagram.com/"
            target="_blank"
            class="social-btn"
          >
            <v-icon size="26">mdi-instagram</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://wa.me/51999999999"
            target="_blank"
            class="social-btn"
          >
            <v-icon size="26">mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn
            icon
            href="mailto:info@claudiaherrera.pe"
            class="social-btn"
          >
            <v-icon size="26">mdi-email</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer-background {
  background-color: #f884be;
  color: #3c2a2a;
  border-top: 1px solid #4c0e25a2;
}

.social-btn {
  margin: 0 8px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.social-btn:hover {
  transform: scale(1.15);
}

.social-btn:hover .v-icon {
  color: #b0004d !important;
}


</style>
