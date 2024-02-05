<script setup>

const elementProps = defineProps({
  element: Array,
  color: {
    type: String,
    default: "white"
  },
  subtitle: String,
  title: String
})
</script>

<template>
    <div class="check-container">
      <h1 class="text-center title ">{{ elementProps.title }}</h1>
      <h4 class="list_title mt-4 ms-5" v-if="elementProps.subtitle !== null">{{ elementProps.subtitle }}</h4>
      <div class="checklist_container mt-5">
        <div class="list" v-for="(item, index) in element" :key="index">
          <CheckElementList :title="item.title" :text="item.text" :color="elementProps.color" :class="{ 'padding_with_no_text': !item.text }" />
        </div>
        <div class="text-center">
          <NuxtLink class="contact_button btn btn-lg">contactez-nous</NuxtLink>
        </div>
      </div>
    </div>
</template>

<style scoped>

.check-container{
  width: 70%;
  min-height: 100vh;
  margin-top: 4rem;
}

.title{
  text-align: center;
  text-transform: uppercase;
  color: #B54A29;
  text-shadow: 0px 5px 5px black ;
  border-bottom: 2px solid white;
  padding-bottom: 1rem;
}

.contact_button{
  text-transform: uppercase;
  background-color: #B54A29;
  color: white;
  border-radius: 3rem;
  margin-top: 2rem;
}
.list .padding_with_no_text{
  padding-bottom: 2rem;
}

</style>
