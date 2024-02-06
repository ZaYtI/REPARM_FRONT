<script setup>
import { ref } from 'vue';
import BanniereImage from '../assets/img/banniere_accueil.jpg';
    const product = ref({
    name: 'Fusil de chasse',
    image: BanniereImage
  });
</script>

<template>
  <div class="container d-flex justify-content-around">
    <ProductCard :product="product" />
    <ProductCard :product="product" />
    <ProductCard :product="product" />
  </div>
</template>
