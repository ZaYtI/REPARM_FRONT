<script setup>
const props = defineProps({
  product: Object
});
const emit = defineEmits(['loadImages'])

</script>

<template>
  <NuxtLink :to="'/product/' + props.product.id" class="card">
    <img :src="props.product.images[0].url" @load="emit('loadImages')" alt="alt"/>
    <div class="card-body">
      <h5 class="card-title">{{ props.product.name }}</h5>
      <p class="text-center text-secondary">{{ props.product.price }}€</p>
    </div>
  </NuxtLink> 
</template>

<style scoped>
.card {
  width: 350px;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background-color: white;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 1rem 1rem rgb(0, 0, 0, 0.5);
}

.card img{
  width: 100%;
  min-height: 200px;
  aspect-ratio: 16/11;
}

.card-title {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0;
}
</style>
