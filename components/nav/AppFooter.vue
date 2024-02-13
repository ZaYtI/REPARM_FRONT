<template>
  <div class="footer py-4">
    <div class="container-xl footer-wrapper">
      <Contact :title="false" />
      <div class="card">
        <iframe class="google-maps-frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.2122975535613!2d2.7392878762190116!3d50.3998809910041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd3a2a680898c5%3A0x21117ba8708d075e!2sSouchez%20Reparm!5e0!3m2!1sfr!2sfr!4v1707817869262!5m2!1sfr!2sfr" style="border:0; width: 100%; height: 100%;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer{
  background-color: #242d24;
  color: white;
}

.card{
  max-width: 500px;
}


.google-maps-frame{
  width: 100%;
}

.footer-wrapper{
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width:752px){
  .footer-wrapper{
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
