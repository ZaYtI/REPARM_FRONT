<script lang="jsx" setup>
import { firstSvg, secondSvg, thirdSvg, fourthSvg, lastSvg } from '~/components/svg/svgComponents'
import { useSelectedCatStore } from '@/stores/selectedCat';

const store = useSelectedCatStore();
const element = [
  {
    svg :<firstSvg />,
    title:"CRÉATION DE CROSSE SUR-MESURE",
    path:"/crosse"
  },{
    svg:<secondSvg />,
    title: "VENTE DE FUSILS D’OCCASION & NEUFS SUR DEMANDE",
    path:"/products",
    click: () => store.setSelectedCat('Tous les fusils')
  },
  {
    svg:<thirdSvg/>,
    title:"POSE ET RÉGLAGES D’ACCESSOIRES POUR FUSIL",
    path:"/pose"
  },
  {
    svg:<fourthSvg/>,
    title:"VENTE D’ACCESSOIRES DE CHASSE SUR DEMANDE",
    path:"/accessoire"
  },{
    svg:<lastSvg/>,
    title:"MISE EN CONFORMITÉ & RÉPARATION",
    path:"/conform"
  }
];

function handleClickItem(elt){
    if(elt.click){
      elt.click()
    }
  }
</script>

<template>
    <div class="container-fluid justify-content-center">
      <div class="row justify-content-center">
      <div v-for="elt in element" :key="element.title" class="col-12 col-lg-2 col-md-6 mb-lg-0 mb-5 container-items text-center">
        <NuxtLink :to="elt.path" class="text-decoration-none" @click="handleClickItem(elt)">
          <div class="mx-auto">
            <component class="svg-container" :is="elt.svg" />
          </div>
          <p class="sub-title-text">
            {{ elt.title }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style >
.svg-container {
  max-width: 75%;
  min-width: 150px;
  fill: white;
  transition: all 0.2s ease-in-out;
}

.svg-container > defs {
  fill-rule: evenodd;
}

.svg-container > .cls-1 {
  fill-rule: evenodd;
}

.sub-title-text {
  font-size: 24px;
  color: white;
  max-width: 70%;
  margin: auto auto;
  transition: all 0.2s ease-in-out;
}

.container-items {
  padding: 5px;
  max-width: 350px;
}

.container-items:hover {
  cursor: pointer;
}

.container-items:hover .svg-container {
  fill: #B54A29;
}

.container-items:hover .sub-title-text {
  color: #B54A29;
}
</style>