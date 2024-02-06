<script setup>
const props = defineProps({
  product: Array
});
</script>

<template>
  <div class="row_card container d-flex justify-content-around">
    <ProductCard v-for="product in props.product" :product="product" :key="product.id" />
  </div>
</template>

<style scoped>
.row_card{
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
}
</style>
