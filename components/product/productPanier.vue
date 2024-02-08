<script setup>
  const props = defineProps({
    product: Object
  })

  import carabines from '../../assets/img/trap.jpg'
</script>

<template>
  <div class="element_panier d-flex">
    <img class="img_product" :src="carabines" alt="test">
    <div class="element_panier_info ps-3">
      <h6 class="mb-0">{{ product.produit.name }}</h6>
      <p class="mb-0">{{ product.produit.price }} €</p>
      <small> qt: {{ product.quantity }}</small>
    </div>
  </div>
</template>

<style scoped>
.element_panier{
  max-height: 150px;
  padding: 1rem;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}

.img_product{
  max-height: 100px;
}

.element_panier_info{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
