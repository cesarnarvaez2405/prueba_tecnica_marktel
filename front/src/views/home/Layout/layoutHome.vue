<template>
  <div class="flex justify-center items-center h-screen w-screen bg-blue-100">
    <div
      class="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all ease-in-out duration-150"
    >
      <slot name="boton"></slot>
    </div>
    <div
      class="flex justify-center items-center w-1/3 h-2/3 rounded-lg relative"
    >
      <div class="w-full h-full">
        <div class="flex justify-center items-center px-5 h-full w-full">
          <slot name="tarjeta"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
</style>