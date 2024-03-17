<script setup>
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const authStore = useAuthStore();

onMounted(() => {
  if(authStore.getIsAdmin){
    router.replace('/')
  }
})
</script>

<template>
  <div class="form_current_user">

  </div>
</template>
