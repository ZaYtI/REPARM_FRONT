<script setup>
const authStore = useAuthStore();

async function removeProduct(product) {
  await authStore.removeProduct(parseInt(product.produit.id))
}
</script>

<template>
  <div v-for="product in authStore.getPanier" :key="product.id" class="element_panier d-flex position-relative">
    <img class="img_product" :src="product.produit.images[0].url" alt="test">
    <div class="element_panier_info ps-3">
      <h6 class="mb-0">{{ product.produit.name }}</h6>
      <p class="mb-0">prix: {{ product.produit.price }} €</p>
      <small> quantite: {{ product.quantity }}</small>
    </div>
    <span class="close-btn text-muted" @click="removeProduct(product)">X</span>
  </div>
</template>

<style scoped>
.element_panier {
  max-height: 150px;
  padding: 1rem;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  position: relative;
}

.img_product {
  max-height: 100px;
}

.element_panier_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 0.5rem;
}

.close-btn:hover {
  cursor: pointer;
}
</style>
