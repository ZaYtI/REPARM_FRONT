<script setup>
  import axios from 'axios';
  const selectedCat = ref('Tous les fusils');
  const allCategorie = [
    {
      name: "Tous les fusils",
      url: 'http://localhost:8000/product/getall'
    },
    {
      name: "Fusils de chasse",
      url: 'http://localhost:8000/product/chasse'
    },
    {
      name: "Fusils de tir",
      url: 'http://localhost:8000/product/tir'
    },
    {
      name: "carabines",
      url: 'http://localhost:8000/product/carabine'
    },
    {
      name: "marques",
      url: 'http://localhost:8000/product/marque'
    }
  ]

  onMounted(async () => {
    const data = await $fetch('http://localhost:8000/product/getall');
  });

  const handleClickOnCategorie = (cat) => {
    selectedCat.value = cat;
    console.log(selectedCat.value);
  }
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES" subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande." title-color="#B54A29" bottom-border/>
  <ProductCategorieSelect :allCategorie="allCategorie" :handle-click-on-categorie="handleClickOnCategorie" :selected-cat="selectedCat" />
</template>
