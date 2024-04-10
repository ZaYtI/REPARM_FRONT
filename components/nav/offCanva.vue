<script setup>
import { ref } from 'vue'

const authStore = useAuthStore();

const totalPrice = ref(0)

const noProduct = ref(false)

const validatebasket = ref(false)


onMounted(() => {
  if(authStore.getPanier == null || authStore.getPanier.length > 0){
    noProduct.value=true;
  }else{
    noProduct.value=false;
  }
})

const calculateTotalPrice = () => {
  totalPrice.value = 0
  for (const product of authStore.getPanier) {
    totalPrice.value = totalPrice.value + (product.produit.price * product.quantity)
  }
}


async function orderBasket(){
  await authStore.validatePanierToOrder();
  validatebasket.value = false;
}


watch(
  () => authStore.getPanier,
  async (newListOfProduct, oldListOfProduct) => {
    if (newListOfProduct != null || newListOfProduct != undefined) {
      if(newListOfProduct.length > 0){
        noProduct.value = false
      }else{
        noProduct.value = true
      }
        calculateTotalPrice();
    }
  }
);

</script>

<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title panier_title" id="offcanvasRightLabel">Votre panier</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="() => validatebasket = false"></button>
    </div>
    <div class="offcanvas-body">
      <div :class="{'d-none':noProduct}">
        <small class="text-secondary text-center">La validation de votre panier n'engage pas de paiement celui ci sera effectuer a la réception en magasins.</small>
        <ProductPanier />
      </div>
      <div :class="{'d-none':!noProduct}" class="element_panier d-flex text-secondary">
        <div class="element_panier_info ps-3">
          <p class="mb-0 text-secondary">Aucun produit disponible</p>
        </div>
      </div>
      <div :class="{'d-none':noProduct}">
        <div class="mt-3 ms-2">
        <small class="text-secondary">Total : {{ totalPrice }} €</small>
      </div>
      <div :class="{'d-none':validatebasket}" class="mt-2 d-flex justify-content-center" @click="() => validatebasket = true">
        <button class="btn btn-lg panier_button">Valider mon panier</button>
      </div>
      <div :class="{'d-none':!validatebasket}">
        <p class="text-danger text-center">Voulez commandez ces produits?</p>
        <div class="d-flex justify-content-around">
          <button class="btn btn-lg btn-success" @click="orderBasket()" >Valider</button>
          <button class="btn btn-lg btn-danger" @click="() => validatebasket= false">Annuler</button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panier_title {
  color: #B54A29;
  text-transform: uppercase;
  text-align: center;
}


.panier_button {
  background-color: #B54A29;
  color: white;
  border: none;
  border-radius: 10px;
}
</style>
