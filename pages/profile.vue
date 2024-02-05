<script setup>
import { useAuthStore } from '@/stores/auth';

const nick = useAuthStore().getProfile.nick;

onMounted(async () => {
  console.log(useAuthStore().isLoggedIn);
  console.log(useAuthStore().getToken);
});
</script>

<template>
  <h1>{{ nick }}</h1>
</template>
