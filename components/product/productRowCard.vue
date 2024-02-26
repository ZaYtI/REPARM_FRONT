<script setup>

const products = ref([null])
const loader = ref(true)
const loadImages = ref(0);
const props = defineProps({
  product: Array
});

function waitLoadImages(){
  loadImages.value = loadImages.value + 1
  console.log(loadImages.value)
  if(loadImages.value == props.product.length){
    loader.value = false;
  }
  console.log(loader.value)
}

onMounted(()=>{
  console.log(props.product)
  console.log(props.product)
  console.log(products)
})
</script>

<template>
  <div class="container products-card-container">
    <div class="row_card d-flex justify-content-around" :class="{'d-none':loader}">
    <ProductCard v-for="product in props.product" :product="product" :key="product.id" :wait-load="waitLoadImages" />
    </div>
    <div class="d-flex justify-content-center spinner-container" :class="{'d-none':!loader}">
      <div class="spinner-border mx-auto" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>
  </div>
</template>

<style scoped>
.row_card{
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
}

.products-card-container{
  min-height: 50vh;
}

.spinner-container{
  align-items: center;
  height: 100%;
}

.spinner-border{
  color: #B54A29;
}
</style>
