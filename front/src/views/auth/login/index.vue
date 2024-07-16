<template>
  <div class="flex flex-col items-center justify-center h-screen dark">
    <form-layout>
      <template v-slot:titulo>
        <h2 class="text-2xl font-bold text-gray-200" v-if="!estaRegistrando">
          Iniciar sección
        </h2>
        <h2 class="text-2xl font-bold text-gray-200" v-else>Registrar</h2>
        <h4 class="text-sm font-bold text-gray-200">
          Prueba técnica - Marktel
        </h4>
      </template>

      <template v-slot:formulario>
        <login-form
          @cambiar-formulario="cambiarFormulario"
          v-if="!estaRegistrando"
        />
        <register-form @cambiar-formulario="cambiarFormulario" v-else />
      </template>
    </form-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";

import formLayout from "../layout/formLayout.vue";
import loginForm from "./forms/loginForm.vue";
import registerForm from "./forms/registerForm.vue";

const estaRegistrando = ref(false);

const cambiarFormulario = () => {
  estaRegistrando.value = !estaRegistrando.value;
};
</script>

<style>
</style>