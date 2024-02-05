<script setup>
  import firstImage from "../assets/img/carabines_poste.jpg"
  import secondImage from "../assets/img/trap.jpg"
  import thirdImage from "../assets/img/tir_carabine.jpg"
  import fourthImage from "../assets/img/carabines_wait.jpg"
  import fiveImage from "../assets/img/fume.jpg"
</script>

<template>
  <div class="cross_container">
    <div class="slide_container">
      <div class="slider">
        <img class="slide" :src="firstImage" >
        <img class="slide" :src="secondImage">
        <img class="slide" :src="thirdImage">
        <img class="slide" :src="fourthImage">
        <img class="slide" :src="fiveImage">
      </div>
    </div>
  </div>
</template>

<style scoped>

.cross_container{
  width: 30%;
  min-height: 100vh;
}

.slide_container{
  height: 100%;
  overflow: hidden;
}

.slider{
  display: flex;
  width: 500%;
  height: 100%;
  animation: slides 15s infinite;
}

.slide{
  width: 20%;
  height: 100%;
  filter: brightness(75%);
  object-fit: cover;
}

@keyframes slides{
  0%,15%{
    transform: translateX(0);
  }
  15%,16%{
    transform: translateX(-20%);
  }
  35%,36%{
    transform: translateX(-40%);
  }
  55%,56%{
    transform: translateX(-60%);
  }
  75%,76%{
    transform: translateX(-80%);
  }
  95%,96%{
    transform: translateX(0);
  }
}
</style>
