<script setup>
  import { useSelectedCatStore } from '@/stores/selectedCat';
  import banniereImage from '~/assets/img/banniere_accueil.jpg';
  import { useRoute } from 'vue-router'
  const store = useSelectedCatStore();
  const router = useRoute()
  const product = ref(store.getListOfProducts[router.params.id - 1])
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES" subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande." title-color="#B54A29" bottom-border/>
  <div class="container-xl mt-4">
    <h1 class="product_title mt-5">{{ product.name}}</h1>
    <div class="weapon_container">
      <div class="caroussel_container p-3">
        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="banniereImage" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img :src="banniereImage" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img :src="banniereImage" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="desc_container">
        <div class="desc_wrapper p-3">
          <h4 class="weapon_title">{{ product.name }}</h4>
          <div class="description mt-4">
            <p>Description:</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi pariatur eaque distinctio, vero ullam incidunt! Laudantium corporis repellat tempora qui minima accusamus officia reiciendis perspiciatis ipsa beatae illo praesentium voluptatibus nam eaque porro fugit, labore tempore itaque quos suscipit! Iusto sint velit dolorum eius! Quisquam labore eveniet autem quae dicta!</p>
          </div>
          <div class="price">
            <h4>
              prix: {{ product.price }}€
            </h4>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-lg add_basket_button">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.weapon_container{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.add_basket_button{
  background-color: #B54A29;
  color: white;
  margin: auto auto;
  text-align: center;
}

.product_title{
  color: #B54A29;
  width: 80%;
  text-align: center;
  margin: auto auto;
}

.caroussel_container{
  max-width: 50%;
  transition: all 0.2s ease-in-out;
}

.desc_container{
  max-width: 40%;
  width: 100%;
  color: white;
  transition: all 0.2s ease-in-out;
}

.desc_wrapper{
  border: 1px solid white;
  border-radius: 2rem;
}

.carousel{
  border-radius: 1rem;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.4);
}

@media screen and (max-width: 950px) {
  .weapon_container{
    flex-direction: column;
    justify-content: center;
  }
  .caroussel_container{
    max-width: none;
    width: 100%;
  }

  .desc_container{
    max-width: none;
    width: 95%;
    margin-top: 2rem;
  }
}
</style>
