<template>
  <modal-layout @cerrar-modal="cerrarModal" v-if="estaAbiertoModal">
    <template v-slot:titulo>Editar usuario</template>

    <template v-slot:subtitulo
      >Ingrese los datos para editar el usuario
    </template>

    <template v-slot:formulario>
      <register-form
        :estaEditando="true"
        :usuarioId="usuarioId"
        @cerrar-modal="cerrarModal"
      />
    </template>
  </modal-layout>
</template>

<script setup>
import { ref } from "vue";
import modalLayout from "../layout/modalLayout.vue";
import registerForm from "../../auth/login/forms/registerForm.vue";

const emit = defineEmits(["obtener-usuarios"]);

const estaAbiertoModal = ref(false);
const usuarioId = ref(null);

const abrirModal = (idUsuario) => {
  estaAbiertoModal.value = true;
  usuarioId.value = idUsuario;
};

const cerrarModal = () => {
  estaAbiertoModal.value = false;
  emit("obtener-usuarios");
};

defineExpose({
  abrirModal,
});
</script>

<style>
</style>