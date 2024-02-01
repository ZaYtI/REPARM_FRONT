<script setup>
import {phoneSvg , homeSvg , mailSvg , mapSvg} from '../svg/svgComponents';
</script>

<template>
  <div class="container-fluid contact-container">
    <div class="contact-content">
      <Banniere title="CONTACTS" title-color="#B54A29" under-banniere :padding-bottom="false" />
      <div class="contact-information-wrapper">
        <div class="information">
          <component class="svg-container-contact" :is="mailSvg" />
          <a href="mailto:souchezreparm@sfr.fr">souchezreparm@sfr.fr</a>
        </div>
        <div class="information">
          <component class="svg-container-contact" :is="homeSvg" />
          <a href="https://maps.app.goo.gl/kPFahbqMRSJ8mV259">84 rue pasteur, 62153 Souchez</a>
        </div>
        <div class="information">
          <component class="svg-container-contact" :is="phoneSvg" />
          <a href="tel:+330786647897">07.86.64.78.97</a>
        </div>
        <div class="information">
          <component class="svg-container-contact" :is="mapSvg" />
          <a href="https://maps.app.goo.gl/kPFahbqMRSJ8mV259">Google Maps</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
}


.svg-container-contact{
  fill: white;
}

.contact-title {
  color: #B54A29;
  text-shadow: 0px 0px 10px black;
  font-size: 60px;
  text-transform: uppercase;
}

.contact-information-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1em;
}

.information {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.information a {
  color: white;
  font-size: 32px;
  text-decoration: none;
  margin-left: 10px ;
}

@media screen and (max-width: 670px) {
  .contact-information-wrapper {
    margin-left: 0;
  }
}

@media screen and (max-width: 450px) {
  .svg-container-contact {
    display: none;
  }
}
</style>
