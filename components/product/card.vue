<script setup>
const props = defineProps({
  product: Object
});
const emit = defineEmits(['loadImages'])
</script>

<template>
  <NuxtLink :to="'/product/' + props.product.id" class="card">
    <img :src="props.product.images[0].url" alt="Your Image Alt Text" @load="emit('loadImages')"/>
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

.card:hover {
  cursor: pointer;
  box-shadow: 0 1rem 1rem rgb(0, 0, 0, 0.5);
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
