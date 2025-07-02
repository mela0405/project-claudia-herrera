<template>
  <v-container class="py-10">
    <h2 class="text-h4 font-weight-bold mb-6 text-center text-primary">
      Especialistas de Belleza
    </h2>
    <v-row>
      <v-col
        v-for="esp in especialistas"
        :key="esp.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <EspecialistaCard
          :data="esp"
          @agendar="abrirModal"
          @ver-perfil="verPerfil"
        />
      </v-col>
    </v-row>

    <ScheduleAppointment
      v-if="especialistaSeleccionada"
      v-model:dialog="showModal"
      :especialista="especialistaSeleccionada"
    />

    <EspecialistaPerfil
    v-if="showPerfil && perfilSeleccionado"
    v-model:dialog="showPerfil"
    :especialista="perfilSeleccionado"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EspecialistaCard from '@/components/EspecialistaCard.vue'
import ScheduleAppointment from '@/components/ScheduleAppointment.vue'
import EspecialistaPerfil from '@/components/EspecialistaPerfil.vue'
import { readTxtFile } from '@/services/dataService'

const especialistas = ref([])
const showModal = ref(false)
const showPerfil = ref(false)
const especialistaSeleccionada = ref(null)
const perfilSeleccionado = ref(null)

function abrirModal(especialista) {
  especialistaSeleccionada.value = especialista
  showModal.value = true
}

function verPerfil(especialista) {
  perfilSeleccionado.value = especialista
  showPerfil.value = true
}

onMounted(async () => {
  especialistas.value = await readTxtFile('/data/especialistas.txt')
})
</script>
