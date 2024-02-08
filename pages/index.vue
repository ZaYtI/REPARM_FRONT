<script setup>
  import BanniereImagePath from '~/assets/img/banniere_accueil.jpg';
</script>
<template>
  <Banniere title="SOUCHEZ REPARM" subtitle="Armurier & artisant crossier" :img="BanniereImagePath"/>
  <Banniere title="NOS SERVICES" title-color="#B54A29" under-banniere />
  <ServicesNosService />
</template>
