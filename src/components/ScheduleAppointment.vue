<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Agendar cita con {{ especialista?.nombre }}
      </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="guardarCita">
          <v-text-field
            v-model="fecha"
            label="Fecha"
            type="date"
            required
            prepend-inner-icon="mdi-calendar"
            class="mb-4"
          />
          <v-text-field
            v-model="hora"
            label="Hora"
            type="time"
            required
            prepend-inner-icon="mdi-clock-time-four"
            class="mb-4"
          />
          <v-textarea
            v-model="notas"
            label="Notas adicionales (opcional)"
            auto-grow
            prepend-inner-icon="mdi-note-text"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
        <v-btn color="primary" @click="guardarCita">Confirmar cita</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { readFromStorage, saveToStorage } from '@/services/dataService'

const props = defineProps({
  dialog: Boolean,
  especialista: Object,
})

const emit = defineEmits(['update:dialog'])

const dialog = ref(props.dialog)
const fecha = ref('')
const hora = ref('')
const notas = ref('')

watch(() => props.dialog, (val) => (dialog.value = val))
watch(dialog, (val) => emit('update:dialog', val))

function guardarCita() {
  if (!fecha.value || !hora.value || !props.especialista) return

  const usuario = readFromStorage('usuario')
  if (!usuario) {
    alert('Debes estar logueado para agendar una cita.')
    return
  }

  const citas = readFromStorage('citas') || []

  const nuevaCita = {
    id: Date.now(),
    usuario_id: usuario.id,
    especialista_id: props.especialista.id,
    nombre_especialista: props.especialista.nombre,
    fecha: fecha.value,
    hora: hora.value,
    notas: notas.value,
  }

  citas.push(nuevaCita)
  saveToStorage('citas', citas)

  alert('Cita agendada exitosamente.')
  dialog.value = false
  fecha.value = ''
  hora.value = ''
  notas.value = ''
}
</script>
