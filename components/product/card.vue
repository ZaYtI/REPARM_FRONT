<script setup>
  import BanniereImage from '../assets/img/banniere_accueil.jpg';
  const props = defineProps({
    product: Object
  });

  function handleClickOnCard(id) {
    console.log('Product id:', id);
  }
</script>

<template>
  <NuxtLink :to="'/product/' + props.product.id" class="card" @click="handleClickOnCard(props.product.id)">
    <img :src="BanniereImage" class="card-img-top" alt="test_image">
    <div class="card-body">
      <h5 class="card-title">{{ props.product.name }}</h5>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  width: 350px;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  transition: all 0.2s ease-in-out;
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
