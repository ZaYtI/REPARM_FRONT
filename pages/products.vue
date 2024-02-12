<script setup>
  import { useSelectedCatStore } from '@/stores/selectedCat';

  const store = useSelectedCatStore();

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
