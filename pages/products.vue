<script setup>
import { useSelectedCatStore } from '@/stores/selectedCat';

const store = useSelectedCatStore();
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES"
    subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande."
    title-color="#B54A29" bottom-border />
  <ProductCategorieSelect />
  <ProductRowCard :product="store.getlistOfSelectedProducts" />
</template>
