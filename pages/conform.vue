<script setup>
import BanniereImagePath from '~/assets/img/banniere_accueil.jpg';
const element = [
  {
    title: "Les avantages de la crosse sur mesure",
    text: "Une crosse adaptée est cruciale pour une expérience de tir optimale. Nos crosses sur mesure offrent une ergonomie supérieure, un alignement parfait avec votre œil pour une visée précise et une réduction de recul pour plus de confort lors du tir."
  },
  {
    title: "La longueur de crosse - Votre adaptabilité:",
    text: "La longueur de la crosse est aussi importante que sa forme. Nous personnalisons chaque détail pour s'adapter à votre morphologie et à votre style de tir, garantissant une prise en main naturelle et une stabilité accrue."
  },
  {
    title: "La pose busc réglable - Précision optimisée:",
    text: "La pose d'un busc réglable est un art en soi. Chez Souchez Reparm, nous maîtrisons cet ajustement pour maximiser votre précision. Un busc réglable permet un alignement parfait de votre œil avec la visée, vous offrant ainsi une constance de tir remarquable."
  },
  {
    title:"Votre Confort, notre priorité:",
    text:"Chaque modification que nous apportons à votre étau de fusil pour améliorer votre expérience de tir. Contactez-nous pour discuter de vos besoins spécifiques et découvrir comment nos solutions sur mesure peuvent transformer votre fusil en une extension parfaite de vous-même."
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
