<script setup>
  import { personSvg} from '../svg/svgComponents';
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
          <NuxtLink class="nav-link" to="/product">FUSILS</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/product">CARABINES</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link " to="/product">CROSS-SUR-MESURE</NuxtLink>
        </li>
      </ul>
      <div class="d-flex justify-content-around" role="search">
        <NuxtLink class="nav-link px-2" to="/contact">CONTACT</NuxtLink>
        <NuxtLink class="nav-link px-2" to="/propos">A PROPOS</NuxtLink>
        <div class="account-icons d-flex">
          <div class="icon-panier px-3">
            <NuxtLink class="nav-link" to="/panier">
              <component class="svg-container-navbar" :is="personSvg" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
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

.svg-container-navbar{
  width: 30px;
  height: 30px;
  fill: white;
}

.svg-container-navbar:hover{
  fill: #B54A29;
}
</style>
