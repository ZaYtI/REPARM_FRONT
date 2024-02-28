<script setup>
  import { useSelectedCatStore } from '@/stores/selectedCat';
  import banniereImage from '~/assets/img/banniere_accueil.jpg';
  import { useRoute } from 'vue-router'
  const store = useSelectedCatStore();
  const authStore = useAuthStore();
  const router = useRoute()
  const redirection = useRouter();
  const product = ref(null)

  async function getProductById(){
    if(store.getlistOfSelectedProducts == null || store.getlistOfSelectedProducts == undefined || store.getlistOfSelectedProducts.length == 0){
      const response = await fetch('http://localhost:8000/product/getById/'+router.params.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    const responseData = await response.json()
    if (response.status !== 200) {
        throw new Error(responseData.message || 'Failed to get the product');
      } else {
        product.value = responseData
      } 
    }else{
      for(const prod of store.getlistOfSelectedProducts){
        if(prod.id == router.params.id){
          product.value = prod
          console.log(product.value)
        }
      }
    }
  }

  async function addProductToBasket(){
    const response = await fetch('http://localhost:8000/panier-item',{
      method : 'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${authStore.getToken}`
      },
      body: JSON.stringify({ produitId:parseInt(router.params.id),quantity:1}),
    })
    const responseData = await response.json()
    if(response.status !== 201){
      throw new Error(responseData.message || 'Failed to add product to basket')
    }
    else{
      await authStore.userPanier();
    }
  }

  async function clickOnAddToBasket(){
    if(authStore.getIsLoggedIn){
      await addProductToBasket()
    }else{
      redirection.replace('/login')
    }
  }

  onMounted(async ()=>{
    await getProductById()
  })
</script>

<template>
  <Banniere title="NOS FUSILS & CARABINES" subtitle="Notre spécialité chez Souchez Reparm est la vente de fusils d’occasion mais nous vendons également des armes neuves à la demande." title-color="#B54A29" bottom-border/>
  <div class="container-xl mt-4" v-if="product">
    <h1 class="product_title mt-5">{{ product.name}}</h1>
    <div class="weapon_container mt-3">
      <div class="caroussel_container p-3">
        <div id="carouselExampleIndicators" class="carousel slide">
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
            <button class="btn btn-lg add_basket_button" @click="clickOnAddToBasket">Ajouter au panier</button>
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

img{
  aspect-ratio: 16/11;
}

.carousel-item{
  transition: all 0.5s ease-in-out;
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
