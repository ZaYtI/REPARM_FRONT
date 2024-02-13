<script setup>
  import BanniereImagePath from '~/assets/img/banniere_accueil.jpg';
</script>
<template>
  <div class="container-xl">
    <Banniere title="A PROPOS" title-color="#B54A29" under-banniere />
    <div class="a-propos px-5">
      <div class="image">
        <img :src="BanniereImagePath" alt="image">
      </div>
      <div class="description px-4">
        <p class="description-text">
          Je suis Sébastien armurier diplômé de l'école de Liège en 1996. J'ai effectué ensuite un diplôme supplémentaire de monteur à bois pour la fabrication de crosse de fusil et carabines. J'ai travaillé auparavant dans différentes enseignes pour forger une expérience solide tel que la prestigieuse société Lebeau Courally. Je suis collectionneur d'armes de chasse et de tir et passionné de fines mécaniques artisanales. C’est avec cette passion que j’ai créer Souchez Reparm.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.a-propos{
  display: flex ;
  align-items: center;
}
.image{
  min-width: 50%;
}
.image>img{
  max-width: 500px;
  width: 100%;
}

.description-text{
  font-size: 20px;
  color: white;
}

@media screen and (max-width:1000px){
  .a-propos{
    flex-direction: column;
  }

  .description-text{
    text-align: center;
  }

  .image{
    width: 100%;
    margin-bottom: 0.5rem;
    text-align: center;
  }
}
</style>
