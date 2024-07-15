<template>
  <modal-layout @cerrar-modal="cerrarModal" v-if="estaAbiertoModal">
    <template v-slot:titulo>Editar usuario</template>

    <template v-slot:subtitulo
      >Ingrese los datos para editar el usuario
    </template>

    <template v-slot:formulario>
      <register-form></register-form>
    </template>
  </modal-layout>
</template>

<script setup>
import { ref } from "vue";
import modalLayout from "../layout/modalLayout.vue";
import registerForm from "../../auth/login/forms/registerForm.vue";

const estaAbiertoModal = ref(false);

const abrirModal = () => {
  estaAbiertoModal.value = true;
};

const cerrarModal = () => {
  estaAbiertoModal.value = false;
};

defineExpose({
  abrirModal,
});
</script>

<style>
</style>