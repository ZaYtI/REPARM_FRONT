<script setup>
const element = [
  {
    title: "Arisanat",
    text: "Chez Souchez Reparm nous sommes des artisans passionnés par l'art de la fabrication sur mesure de crosse de fusil. Nous comprenons que chaque tireur a des besoins uniques, c'est pourquoi nous nous engageons à créer des pièces qui épousent parfaitement votre style de tir, votre confort et votre esthétique personnelle."
  },
  {
    title: "Personnalisation",
    text: "Votre crosse de fusil sur mesure est le mélange parfait entre la fabrication artisanale et les technologies de pointe. Chaque pièce est conçue avec une attention méticuleuse aux détails, garantissant une ergonomie supérieure et une performance optimale.  Nous travaillons avec une variété de matériaux haut de gamme, vous offrant un large choix pour personnaliser votre arme à feu."
  },
  {
    title: "collaboration client",
    text: "Lorsque vous choisisez Souchez Reparm vous entrez dans un processus de création minutieux. Nous collaborons rigoureusement avec vous pour comprendre vos envies, vos besoins, vos préférences et vos exigences. Chaque étape, de la conception initiale à la finition finale, est réalisée avec un soin inégalé pour garantir une satisfaction totale. "
  }
]


onMounted(()=>{
  document.querySelector('body').scrollTo(0,0);
})
</script>

<template>
  <div class="d-flex cross_wrapper">
    <CheckSlide />
    <CheckListContainer title="CRÉATION DE CROSSES SUR-MESURE" :element="element" color="white" />
  </div>
</template>

<style>

.cross_wrapper{
  min-height: 100vh;
}
</style>
