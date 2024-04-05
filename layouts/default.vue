<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const selectCatStore = useSelectedCatStore();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if (localStorage.getItem('token')) {
    await authStore.profile();
  }
  await selectCatStore.setListOfCategorie();
  await selectCatStore.setAllProduct();
  await selectCatStore.setSelectedCat(0,'Tous les fusils');
});

watch(
  () => authStore.getIsLoggedIn,
  async (newgetIsLoggedIn, oldgetIsLoggedIn) => {
    if (newgetIsLoggedIn) {
      await authStore.profile();
      await authStore.userPanier();
      if (!authStore.getIsAdmin) {
        if (route.path == '/admin') {
          router.replace('/profile')
        }
        if (router)
          await authStore.setUserOrder();
      }
    } else if (!newgetIsLoggedIn) {
      if (route.path == '/admin' || route.path == '/profile')
        router.replace('/login')
    }
  }
)
</script>

<template>
  <div class="d-flex flex-column default-layout">
    <NavAppNavbar />

    <main class="default-layout-content overflow-hidden bg-color-primary pb-5">
      <slot />
    </main>

    <NavAppFooter class="bg-color-primary" />
  </div>
</template>

<style>
.default-layout {
  display: flex;
  flex-direction: column;
}

.default-layout-content {
  flex-grow: 1;
}

.default-layout {
  min-height: 100vh;
}

.bg-color-primary {
  background-color: #3A483B;
}
</style>
