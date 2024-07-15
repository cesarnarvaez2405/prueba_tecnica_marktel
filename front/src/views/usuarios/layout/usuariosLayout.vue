<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center bg-blue-100"
  >
    <div
      class="absolute top-4 left-4 bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all ease-in-out duration-150"
    >
      <slot name="boton"></slot>
    </div>
    <div class="p-2 mb-5">
      <slot name="titulo"></slot>
    </div>

    <div class="w-2/3 h-2/4 py-5">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
</style>