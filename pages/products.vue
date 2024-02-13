<script setup>
  import { useSelectedCatStore } from '@/stores/selectedCat';

  const store = useSelectedCatStore();

  const allCategorie = [
    {
      name: "Tous les fusils",
      url: 'https://reparm-api.onrender.com/product/getall'
    },
    {
      name: "Fusils de chasse",
      url: 'https://reparm-api.onrender.com/product/chasse'
    },
    {
      name: "Fusils de tir",
      url: 'https://reparm-api.onrender.com/product/tir'
    },
    {
      name: "carabines",
      url: 'https://reparm-api.onrender.com/product/carabine'
    },
    {
      name: "marques",
      url: 'https://reparm-api.onrender.com/product/marque'
    }
  ]

  async function handleClickOnCategorie(cat){
    await store.setSelectedCat(cat);
  }

  onMounted(() => {
    if(store.getListOfProducts === null || store.getListOfProducts === undefined || store.getListOfProducts.length === 0){
      store.setSelectedCat("Tous les fusils")
    }
  })
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES" subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande." title-color="#B54A29" bottom-border/>
  <ProductCategorieSelect :allCategorie="allCategorie" :handle-click-on-categorie="handleClickOnCategorie" :selected-cat="useSelectedCatStore.getSelectedCat" />
  <ProductRowCard :product="store.getListOfProducts" />
</template>
