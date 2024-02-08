<script setup>
  import { checkSvg } from '~/components/svg/svgComponents'
  import banniereImage from '~/assets/img/banniere_accueil.jpg';
  const props = defineProps({
    title: String,
    text: String,
    reverse: Boolean
  })
</script>

<template>
  <div class="element_container my-3" :class="{'flex-row-reverse':props.reverse,'flex-row':!props.reverse}">
    <div class="side_image_wrapper">
      <div class="side_image">
        <img :class="{'direction-reverse': props.reverse, 'direction-row': !props.reverse}" :src="banniereImage" alt="test">
      </div>
    </div>
    <div class="ps-5 element_text_container d-flex flex-column justify-content-center mt-3 mt-md-0" :class="{'reverse':!props.reverse}">
      <h2 class="mb-4 element_title">{{props.title}}</h2>
      <p class="pe-5">{{props.text}}</p>
    </div>
  </div>
</template>

<style scoped>
  .element_container{
    padding: 20px;
    display: flex;
    justify-content: space-around;
    transition: all 0.2s ease-in-out;
  }

  .element_title{
    position: relative;
    max-width: 75%;
  }

  .element_title::before{
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 75%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .element_container .direction{
    flex-direction: row-reverse;
  }

  .side_image_wrapper{
    max-width: 450px;
  }

  .side_image{
    width: 100%;
    height: auto;
  }

  .side_image img{
    width: 100%;
    height: auto;
    transition: all 0.2s ease-in-out;
  }
  .direction-row {
    box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.4);
}

  .direction-reverse  {
    box-shadow: -5px -5px 5px 1px rgba(0, 0, 0, 0.4);
  }

  .element_text_container{
    max-width: 600px;
    color: white;
    position: relative;
  }

  .element_text_container::before{
    content: '';
    position: absolute;
    top: 0;
    left: -5px;
    width: 5px;
    height: 100%;
    background-color: #B54A29;
  }

  .element_text_container.reverse::before{
    left: auto;
    right: 5px;
  }

  @media screen and (max-width: 900px){
    .element_container{
      display: block;
      margin: auto auto;
      padding: 0;
    }

  .side_image_wrapper{
    width: 100%;
    margin: auto auto;
  }
  }

  @media  screen and (max-width: 650px){
    .side_image_wrapper{
      max-width: 100%;
      width: 100%;
  }
  }
</style>
