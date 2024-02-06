<script setup>
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
  <div class="d-flex pose_container">
    <CheckSlide />
    <CheckListContainer title="POSE ET RÉGLAGES" :element="element" subtitle="Prestations mécaniques de tout type sur fusil ou carabine avec devis gratuit:" />
  </div>
</template>

<style scoped>
  .pose_container{
    min-height: 100vh;
  }
</style>
