<script setup>
import { ref } from 'vue'

const props = defineProps({
  listOfProduct: {
    type: Array,
    required: false
  }
})

const totalPrice = ref(0)

const calculateTotalPrice = () => {
  totalPrice.value = 0
  for (const product of props.listOfProduct) {
    totalPrice.value = totalPrice.value + (product.produit.price * product.quantity)
  }
}

watch(
  () => props.listOfProduct,
  async (newListOfProduct, oldListOfProduct) => {
    if (newListOfProduct != null || newListOfProduct != undefined) {
      calculateTotalPrice();
    }
  }
);

</script>

<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title panier_title" id="offcanvasRightLabel">Votre panier</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <ProductPanier v-for="product in props.listOfProduct" :key="product.id" :product="product" />
      </div>
      <div class="mt-3 ms-2">
        <small class="text-secondary">Total : {{ totalPrice }} €</small>
      </div>
      <div class="mt-2 d-flex justify-content-center">
        <button class="btn btn-lg panier_button">Valider mon panier</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panier_title {
  color: #B54A29;
  text-transform: uppercase;
  text-align: center;
}


.panier_button {
  background-color: #B54A29;
  color: white;
  border: none;
  border-radius: 10px;
}
</style>
