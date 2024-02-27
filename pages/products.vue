<script setup>
  import { useSelectedCatStore } from '@/stores/selectedCat';

  const store = useSelectedCatStore();

  async function handleClickOnCategorie(cat){
    if(cat == "Tous les fusils"){
      await store.setSelectedCat(0,"Tous les fusils")
    }
    await store.setSelectedCat(cat.id,cat.name);
  }

  onMounted(async () => {
    if(store.getListOfCategorie == '' || store.getListOfCategorie == undefined || store.getListOfCategorie.length == 0){
      await store.setListOfCategorie();
    }
     if(store.getListOfProducts == null || store.getListOfProducts == undefined || store.getSelectedCat == null || store.getSelectedCat == undefined){
      await store.setSelectedCat(0,'Tous les fusils');  
     }
  })
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES" subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande." title-color="#B54A29" bottom-border/>
  <ProductCategorieSelect :allCategorie="store.getListOfCategorie" :handle-click-on-categorie="handleClickOnCategorie" :selected-cat="useSelectedCatStore.getSelectedCat" />
  <ProductRowCard :product="store.getListOfProducts" />
</template>
