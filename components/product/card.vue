<script setup>
  const props = defineProps({
    product: Object
  });
</script>

<template>
  <div class="card">
    <img :src="props.product.image" class="card-img-top" alt="test_image">
    <div class="card-body">
      <h5 class="card-title">{{ props.product.name }}</h5>
    </div>
  </div>
</template>


<style scoped>
.card {
  width: 100%;
  max-width: 350px;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0;
}
</style>
