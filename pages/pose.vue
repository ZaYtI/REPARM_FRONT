<script setup>
import BanniereImagePath from '~/assets/img/banniere_accueil.jpg';
const element = [
  {
    title: "NETTOYAGE",
  },
  {
    title: "RÉPARATIONS COMPLEXES",
  },
  {
    title: "RÉALISATION DE NOUVELLES PIÈCES ",
  },
  {
    title:"MONTAGES OPTIQUES GRANDE CHASSE OU GIBIER D’EAU",
  },
  {
    title:"TOUT TRAVAUX SUR DEMANDE ",
  }
]

onMounted(()=>{
  document.querySelector('body').scrollTo(0,0);
})
</script>

<template>
  <div>
    <Banniere title="SOUCHEZ REPARM" subtitle="Armurier & artisant crossier" :img="BanniereImagePath"/>
  </div>
  <div class="d-flex conform_container d-flex flex-column container-xl mt-5 mb-5">
    <CheckElement v-for="(el,index) in element" :title="el.title" :text="el.text" :reverse="index%2 ==0" />
  </div>
</template>

<style scoped>
  .container-xl{
    transition: all 0.2s ease-in-out;
  }
</style>
