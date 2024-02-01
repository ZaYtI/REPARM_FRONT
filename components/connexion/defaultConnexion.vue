<script setup>

const ConnexionCardProps = defineProps({
  title:{
    type: String,
    required: true
  },
  pages:{
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="account_wrapper">
    <ConnexionCard :title="ConnexionCardProps.title" :pages="ConnexionCardProps.pages" />
  </div>
</template>


<style>
.account_wrapper{
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: url('../../assets/img/sanglier.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height:100vh;
}
</style>
