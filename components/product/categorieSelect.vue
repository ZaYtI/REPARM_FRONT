<script setup>
import { useSelectedCatStore } from '@/stores/selectedCat';
const store = useSelectedCatStore();
</script>
<template>
  <div class="px-0 pt-3 selected-cat-container">
    <div class="justify-content-center button-wrapper d-lg-flex d-none">
      <div class="button-container" v-for="cat in store.getListOfCategorie" :key="cat">
        <button class="btn btn-start mx-3 text-uppercase" @click="() => store.setSelectedCat(cat.id, cat.name)"
          :class="{ 'active': store.getSelectedCat === cat.name }">{{ cat.name }}</button>
      </div>
    </div>
    <div class="d-lg-none justify-content-center px-5">
      <div class="d-flex justify-content-center">
        <button
          class="btn-lg btn-collapse dropdown-toggle d-flex align-items-center justify-content-center w-100 collapsed"
          type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false"
          aria-controls="collapseExample">
          Selectionner une catégorie
        </button>
      </div>
      <div class="collapse rounded-bottom" id="collapseExample">
        <div class="card card-body">
          <div class="justify-content-center">
            <div class="button-container" v-for="cat in store.getListOfCategorie" :key="cat">
              <button class="btn btn-phone w-100 text-uppercase" @click="() => store.setSelectedCat(cat.id, cat.name)"
                :class="{ 'active': store.getSelectedCat === cat.name }">{{ cat.name }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="selected-cat-title text-center py-2 mt-4">{{ store.getSelectedCat }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-phone:focus {
  background-color: white;
}

.btn-phone:not(.active) {
  background-color: white;
  color: #B54A29;
}

.btn-phone {
  background-color: #B54A29;
  color: white;
}

.btn-collapse {
  min-width: 300px;
  background-color: white;
  color: #B54A29;
  padding: 0.7rem;
  border: none;
  border-radius: 0.5rem;
  transition: background-color .1s ease-in-out;
}

.btn-collapse:not(.collapsed) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: white;
  box-shadow: none;
}

.card {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: none;
}

.btn-start {
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

  .button-wrapper {
    flex-wrap: wrap;
  }

  .button-container {
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
