<script setup>
import { useSelectedCatStore } from '@/stores/selectedCat';
const store = useSelectedCatStore();
const props = defineProps({
  allCategorie: {
    type: Array,
    required: true
  },
  handleClickOnCategorie: {
    type: Function,
    required: true
  },
  selectedCat:{
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="container-fluid  px-0 pt-3 selected-cat-container">
    <div class="d-flex justify-content-center button-wrapper">
      <div class="button-container" v-for="cat in props.allCategorie" :key="cat">
        <button
          class="btn mx-3 text-uppercase"
          @click="() => props.handleClickOnCategorie(cat.name)"
          :class="{ 'active': store.getSelectedCat === cat.name }"
        >{{ cat.name }}</button>
      </div>
    </div>
    <div>
      <h3 class="selected-cat-title text-center py-2 mt-4">{{ props.selectedCat }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  position: relative;
  color: white;
  outline: none;
  box-shadow: none;
  border: none;

  &::after {
    position: absolute;
    content: "";
    width: 50%;
    height: 5px;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 5px;
  }

  .button-wrapper{
    flex-wrap: wrap;
  }

  .button-container{
    min-width: 150px;
  }

  &:hover {
    color: #B54A29;
    &::after {
      background-color: #B54A29;
    }
  }

  &.active {
    color: #B54A29;
    &::after {
      background-color: #B54A29;
    }
  }
}

.selected-cat-title {
  color: #B54A29;
  text-shadow: 0px 0px 10px black;
  font-size: 2rem;
  text-transform: uppercase;

}

</style>
