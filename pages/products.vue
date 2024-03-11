<script setup>
import { useSelectedCatStore } from '@/stores/selectedCat';

const store = useSelectedCatStore();

onMounted(async () => {
  if (store.getAllProducts == null || store.getAllProducts == undefined || store.getAllProducts.length == 0) {
    await store.setAllProduct();
  }
  if (store.getlistOfSelectedProducts == null || store.getlistOfSelectedProducts == undefined || store.getlistOfSelectedProducts.length == 0) {
    await store.setSelectedCat(0, 'Tous les fusils');
  }
  console.log(store.getAllProducts)
  console.log(store.getlistOfSelectedProducts)
})
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES"
    subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande."
    title-color="#B54A29" bottom-border />
  <ProductCategorieSelect />
  <ProductRowCard :product="store.getlistOfSelectedProducts" />
</template>
