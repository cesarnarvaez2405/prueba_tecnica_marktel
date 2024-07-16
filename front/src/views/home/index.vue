<template>
  <layout-home>
    <template v-slot:boton>
      <div class="flex flex-row gap-1 cursor-pointer" @click="cerrarSeccion()">
        <p>Salir</p>
        <arrow-right-start-on-rectangle-icon class="size-6" />
      </div>
    </template>

    <template v-slot:tarjeta>
      <button
        class="flex flex-col text-white gap-8 justify-center items-center h-1/2 w-full border rounded-lg bg-gray-800 hover:shadow-xl hover:scale-95 transition-all ease-in-out duration-150 cursor-pointer"
        :class="{
          'opacity-55': rol !== 'admin',
        }"
        :disabled="rol !== 'admin'"
        @click="ingresarSubUsuarios()"
      >
        <h2 class="font-bold text-3xl">Gestion de usuarios</h2>
        <IdentificationIcon class="size-14" />
        <p v-if="rol !== 'admin'">No tienes permiso para ingresar</p>
      </button>
    </template>
  </layout-home>
</template>

<script setup>
import { ref } from "vue";
import {
  ArrowRightStartOnRectangleIcon,
  IdentificationIcon,
} from "@heroicons/vue/24/solid";
import layoutHome from "./Layout/layoutHome.vue";
import { useAuthStore } from "../../store/auth";
import router from "../../router/index";

const store = useAuthStore();

const rol = ref(store.rol);

const cerrarSeccion = async () => {
  await store.cerrarSeccion();
  router.push({ name: "login" });
};

const ingresarSubUsuarios = () => {
  if (store.rol !== "admin") {
    return;
  }
  router.push({ name: "usuarios" });
};
</script>

<style>
</style>