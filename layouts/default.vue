<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

onMounted(() => {
  if (localStorage.getItem('token')) {
    authStore.isLoggedIn();
  }
});

watch(
  () => authStore.getIsLoggedIn,
  async (newgetIsLoggedIn, oldgetIsLoggedIn) => {
    console.log('in the watch');
    if (newgetIsLoggedIn) {
      await authStore.profile();
      await authStore.userPanier();
    }
  }
)
</script>

<template>
  <div class="d-flex flex-column default-layout">
      <NavAppNavbar/>

      <main class="default-layout-content overflow-hidden bg-color-primary">
          <slot />
      </main>

      <NavAppFooter class="bg-color-primary"/>
  </div>
</template>

<style>
.default-layout{
  display: flex ;
  flex-direction: column;
}
.default-layout-content{
    flex-grow:1;
}
.default-layout{
    min-height: 100vh;
}

.bg-color-primary{
  background-color: #3A483B;
}
</style>
