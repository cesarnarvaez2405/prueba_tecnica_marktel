<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center bg-blue-100"
  >
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