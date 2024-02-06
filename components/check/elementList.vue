<script setup>
  import { checkSvg } from '~/components/svg/svgComponents'
  const elementProps = defineProps({
    text: String,
    title: String,
    color: {
      type: String,
      default: "white"
    }
  })
</script>

<template>
  <div class="element" :class="{'element_before':elementProps.text}">
    <component class="icons" :is="checkSvg()" />
    <h4 class="list_title" :style="{ color: elementProps.color }">{{ elementProps.title }}</h4>
    <p class="text_list px-2 text-white" >
      {{ elementProps.text }}
    </p>
  </div>
</template>

<style>
.list_title{
  text-transform: uppercase;
  font-weight: bolder;
  color: white;
}

.element{
  position: relative;
  max-width: 660px;
}

.element_before::before{
  content: "";
  position: absolute;
  top: 0;
  left: -40px;
  height: 100%;
  width: 2px;
  background-color: white;
  transform: translateX(15px);
}

.icons{
  background-color: white;
  max-width: 30px;
  border-radius: 50%;
  fill: #B54A29;
  position: absolute;
  left: -40px;
}

.list{
  padding-left: 5rem;
  padding-right: 5rem;
}
</style>
