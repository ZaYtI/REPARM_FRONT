<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    title:{
      type: String,
      required: true
    },
    subtitle:{
      type: String,
      required: false
    },
    img:{
      type: String,
      required: false
    },
    titleColor: {
      type: String,
      default: 'white'
    },
    bottomBorder:{
      type: Boolean,
      default: false
    },
    underBanniere:{
      type: Boolean,
      default: false
    },
    paddingBottom:{
      type: Boolean,
      default: true
    }
  });
</script>
<template>
<div class="mt-0 banniere" :style="{backgroundImage : `url(${props.img})`, height: props.img ? '323px' : 'auto',paddingTop: props.underBanniere ? '40px':'80px',paddingBottom: props.paddingBottom ? '80px':'0px'}" :class="{'bottom-border': props.bottomBorder}">
    <div class="title container">
      <div class="top-title">
        <h1 class="banniere_title" :style="{color: props.titleColor}">
          {{ props.title }}
        </h1>
      </div>
      <div class="sub-title">
        <p class="banniere_subtitle">{{ props.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.banniere{
  background-size: cover;
  background-position: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.bottom-border{
    border-bottom: 3px solid white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
}
.banniere_title{
  text-align: center;
  color: white;
  text-shadow: 0px 0px 10px black;
  font-size: 60px;
  padding-bottom: 0;
}

.banniere_subtitle{
  text-align: center;
  color: white;
  text-shadow: 0px 0px 10px black;
  max-width: 50%;
  margin: auto auto;
}
</style>
