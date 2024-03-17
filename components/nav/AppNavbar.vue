<script setup>
import { personSvg, basketSvg } from '../svg/svgComponents';
import { useAuthStore } from '@/stores/auth';
import { useSelectedCatStore } from '@/stores/selectedCat';

const authStore = useAuthStore();
const selectedStore = useSelectedCatStore();
const { canDisplayNavbarBackground } = useNavbarBackground()
const personLink = ref('/login')
const route = useRoute()

async function LoadBasket() {
  if (authStore.getPanier == undefined) {
    await authStore.userPanier();
  }
}

const navbar = ref(null)
const navbarCollapse = ref(null)
const isMobile = ref(false)

function checkIsMobile() {
  if (window.innerWidth > 992) {
    isMobile.value = false
  } else {
    isMobile.value = true
  }
}

function addBackground() {
  if (navbar.value.classList.contains('-shown') && window.scrollY === 0 && !navbarCollapse.value.classList.contains('show')) {
    navbar.value.classList.remove('-shown')
  } else {
    navbar.value.classList.add('-shown')
  }
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
  window.addEventListener('scroll', addBackground)
})

watch(
  () => authStore.getIsLoggedIn,
  async (newgetIsLoggedIn, oldgetIsLoggedIn) => {
    if (newgetIsLoggedIn) {
      personLink.value = "/profile"
    } else {
      if (route.path == "/admin") {
        navigateTo('/login')
      }
      personLink.value = "/login"
    }
  }
)

</script>
<template>
  <nav class="navbar navbar-expand-lg  w-100" :class="{ 'can-background-display': canDisplayNavbarBackground }"
    ref="navbar" data-bs-theme="dark">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/"><img class="logo"  src="../../assets/img/logo_blanc.png" alt="logo"/></NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" @click="addBackground()"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation" data-bs-theme="dark">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="navbarCollapse" v-bs-collapse
        data-bs-toggle="false">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/products" @click="selectedStore.setSelectedCat(0, 'Tous les fusils')">FUSILS
            </NuxtLink>
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
              <div class="nav-link">
                <NuxtLink v-if="!authStore.getIsAdmin" :to="personLink">
                  <component class="svg-container-navbar" :is="personSvg" />
                </NuxtLink>
                <NuxtLink v-else to="/admin">
                  <component class="svg-container-navbar" :is="personSvg" />
                </NuxtLink>
                <button v-if="authStore.getIsLoggedIn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight" data-bs-theme class="basket_button" @click="LoadBasket">
                  <component class="svg-container-navbar" :is="basketSvg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <NavOffCanva :list-of-product="authStore.getPanier" />
</template>


<style lang="scss" scoped>
.nav-link {
  color: white;
}

.logo{
  max-width: 60px;
}

.nav-link:hover {
  text-decoration: underline;
  color: #B54A29;
}

.navbar {
  position: fixed;
  z-index: 100;
}

.basket_button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.svg-container-navbar {
  max-width: 25px;
  max-height: 25px;
  fill: white;
}

.svg-container-navbar:hover {
  fill: #B54A29;
}

.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #242d24;
  transform: translateY(-100%);
  transition: transform 0.25s ease-in-out;
}

.navbar .container-fluid {
  position: relative;
}

.navbar.-shown.can-background-display::before {
  transform: translateY(0);
}

.nav-link {
  margin: auto auto;
}

.nav-link.with-icon {
  display: flex;
  align-items: center;
}
</style>
