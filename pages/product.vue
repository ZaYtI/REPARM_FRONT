<script setup>
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

  const divideListOfProduct = ref([]);
  const data = ref([]);

  onMounted(async () => {
    data.value = await $fetch('https://reparm-api.onrender.com/product/getall');
  });

  const handleClickOnCategorie = (cat) => {
    selectedCat.value = cat;
  }
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES" subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande." title-color="#B54A29" bottom-border/>
  <ProductCategorieSelect :allCategorie="allCategorie" :handle-click-on-categorie="handleClickOnCategorie" :selected-cat="selectedCat" />
  <ProductRowCard :product="data" />
</template>
