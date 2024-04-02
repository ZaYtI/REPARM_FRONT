<script setup>
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const authStore = useAuthStore();

onMounted(async () => {
  if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
    router.replace('/login');
  }
  if (authStore.getIsAdmin) {
    router.replace('/admin')
  }
})
</script>

<template>
  <div>
    <Banniere title="ESPACES CLIENT" title-color="#B54A29" bottom-border />
  </div>
  <div class="container-xl">
    <div class="row">
      <div class="col-lg-6 col-12 px-3">
        <div class="user-information mx-auto">
          <h3 class="profil_title">Modifier vos Informations</h3>
          <ConnexionRegitser profilPage />
        </div>
      </div>
      <div class="order-information col-lg-6 col-12 mt-lg-0 mt-5 ">
        <OrderHistory class="mt-3" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.container-xl {
  margin-top: 3rem;
}

.user-information {
  max-width: 500px;
  background-color: white;
  border-radius: 1rem;
}

.profil_title {
  color: #3A483B;
  text-shadow: 0px 5px 5px grey;
  padding: 1rem;
  text-align: center;
}
</style>
