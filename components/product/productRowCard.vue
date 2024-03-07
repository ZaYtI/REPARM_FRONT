<script setup>

const products = ref([null])
const loader = ref(true)
const loadImages = ref(0);
const props = defineProps({
  product: Object
});
</script>

<template>
  <div class="container products-card-container">
    <div class="row_card d-flex justify-content-evenly">
      <ProductCard v-for="product in props.product" :product="product" :key="product.id" :wait-load="waitLoadImages" />
    </div>
  </div>
</template>

<style scoped>
.row_card {
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
}

.products-card-container {
  min-height: 50vh;
}

.spinner-container {
  align-items: center;
  height: 100%;
}

.spinner-border {
  color: #B54A29;
}
</style>
