<script setup>
  import { personSvg , basketSvg} from '../svg/svgComponents';
  import { useAuthStore } from '@/stores/auth';
  import { useSelectedCatStore } from '@/stores/selectedCat';

  const authStore = useAuthStore();
  const selectedStore = useSelectedCatStore

  async function LoadBasket(){
    await authStore.userPanier()
  }

</script>
<template>
  <nav class="navbar navbar-expand-lg w-100">
  <div class="container-fluid">
    <NuxtLink class="navbar-brand" to="/">Logo</NuxtLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" v-bs-collapse>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/product" @click="selectedStore.setSelectedCat('Tous les fusils')">FUSILS</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/product" @click="selectedStore.setSelectedCat('carabines')">CARABINES</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link " to="/crosse">CROSS-SUR-MESURE</NuxtLink>
        </li>
      </ul>
      <div class="d-flex justify-content-around" role="search">
        <NuxtLink class="nav-link px-2" to="/contact">CONTACT</NuxtLink>
        <NuxtLink class="nav-link px-2" to="/propos">A PROPOS</NuxtLink>
        <div class="account-icons d-flex">
          <div class="icon-panier px-3">
            <div class="nav-link" to="/login">
              <NuxtLink to="login">
                <component class="svg-container-navbar" :is="personSvg" />
              </NuxtLink>
              <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-bs-theme class="basket_button" @click="LoadBasket">
                <component class="svg-container-navbar" :is="basketSvg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
<NavOffCanva :list-of-product="authStore.getPanier"/>
</template>


<style scoped>

.nav-link{
  color: white;
}
.nav-link:hover{
  text-decoration: underline;
  color: #B54A29;
}
.navbar{
  position: fixed ;
  z-index: 100;
}

.basket_button{
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.svg-container-navbar{
  width: 30px;
  height: 30px;
  fill: white;
}

.svg-container-navbar:hover{
  fill: #B54A29;
}
</style>
