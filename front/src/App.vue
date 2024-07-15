<template>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./store/auth";

const store = useAuthStore();

onMounted(async () => {
  await store.checkAuthToken();
});
</script>

<style>
</style>