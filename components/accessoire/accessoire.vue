<template>
  <Banniere class="banniere_title" title="VENTE D’ACCESSOIRES SUR DEMANDE" title-color="#B54A29" under-banniere :padding-bottom="false" />
  <div class="container-fluid container-accessoire mt-3">
    <p class="sub-title-accessoire">
      Pour toute commande d’accessoire merci de nous contacter directement.
    </p>
    <button class="btn btn-lg button-accessoire">
      CONTACTEZ-NOUS
    </button>
  </div>
</template>

<style scoped>
.banniere_title{
  max-width: 800px;
  margin: auto auto;
}

.container-accessoire{
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.button-accessoire{
  background-color: #B54A29;
  color:white;
  margin:auto auto;
  text-align:center;
  align-items:center;
  margin-top:2rem;
}

.sub-title-accessoire{
  font-size: 50px;
  text-align:center;
  color:white;
  font-weight:bold;
  max-width:80%;
  margin:auto auto;
}

</style>
