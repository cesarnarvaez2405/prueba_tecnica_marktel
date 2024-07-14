<template>
  <Form @submit="logearse" v-slot="{ errors }" class="flex flex-col gap-2">
    <div class="flex flex-col">
      <Field
        name="username"
        placeholder="Username"
        class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        :class="{
          ' border-red-700 border-2': errors.username,
        }"
        type="text"
        rules="required"
        v-model="usuario.username"
      />
      <error-alert :name="'username'" />
    </div>
    <div class="flex flex-col">
      <Field
        name="password"
        placeholder="Contraseña"
        class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        :class="{
          ' border-red-700 border-2': errors.password,
        }"
        type="password"
        rules="required|max-8"
        v-model="usuario.password"
      />
      <error-alert :name="'password'" />
    </div>

    <p class="text-white">
      Quieres registrarse?
      <a
        class="text-sm text-blue-500 -200 hover:underline cursor-pointer"
        @click="$emit('cambiar-formulario')"
        >Aquí</a
      >
    </p>
    <button
      class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
      type="submit"
    >
      Ingresar
    </button>
  </Form>
</template>

<script setup>
import { reactive } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";

import errorAlert from "../../../../components/errorAlert.vue";
import { useAuthStore } from "../../../../store/auth";
import router from "../../../../router/index";

defineEmits(["cambiar-formulario"]);

const store = useAuthStore();
const usuario = reactive({
  username: null,
  password: null,
});

const logearse = async () => {
  const usuarioLogueado = await store.login(usuario);
  if (usuarioLogueado) {
    router.push({ name: "home" });
  }
  limpiar();
};

const limpiar = () => {
  usuario.username = null;
  usuario.password = null;
};
</script>

<style>
</style>