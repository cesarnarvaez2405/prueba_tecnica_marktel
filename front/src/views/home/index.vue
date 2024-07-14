<template>
  <layout-home>
    <template v-slot:boton>
      <div class="flex flex-row gap-1 cursor-pointer">
        <p>Salir</p>
        <arrow-right-start-on-rectangle-icon class="size-6" />
      </div>
    </template>

    <template v-slot:tarjeta>
      <div
        class="flex flex-col text-white gap-8 justify-center items-center h-1/2 w-full border rounded-lg bg-gray-800 hover:shadow-xl hover:scale-95 transition-all ease-in-out duration-150 cursor-pointer"
      >
        <h2 class="font-bold text-3xl">Gestion de usuarios</h2>
        <IdentificationIcon class="size-14" />
      </div>
    </template>
  </layout-home>
</template>

<script setup>
import {
  ArrowRightStartOnRectangleIcon,
  IdentificationIcon,
} from "@heroicons/vue/24/solid";
import layoutHome from "./Layout/layoutHome.vue";
</script>

<style>
</style>