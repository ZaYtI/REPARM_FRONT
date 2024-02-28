<script setup>
const authStore = useAuthStore();

const selectCatStore = useSelectedCatStore();

const weapons = ref(null)


async function deleteProduct(productId){
  try{
    const response = await fetch(`https://reparm-api-without-docker.onrender.com/product/delete/${productId}`,{
      headers:{
        'Authorization': `Bearer ${authStore.getToken}`,
      },
      method:"DELETE"
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la requête HTTP');
    }

    await selectCatStore.setAllProduct();
  } catch(error){
    console.error(error)
  }
}

onMounted(async() => {
    if(selectCatStore.getAllProducts == null || selectCatStore.getAllProducts == undefined || selectCatStore.getAllProducts.length == 0){
        selectCatStore.setAllProduct();
    }
})

</script>


<template>
    <div>
    <Banniere title="ESPACES CLIENT" title-color="#B54A29" bottom-border/>
  </div>
    <div class="container-xl admin-container">
        <div class="container-weapons-table">
            <div class="d-flex justify-content-between px-3 pb-3">
                <h2 class="text-white">Vos produits :</h2>
                <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter</button>
            </div>
            <table class="table table-striped" aria-describedby="table of product">
                <thead class="head">
                    <tr>
                        <th class="text-center">Id</th>
                        <th class="text-center">Nom</th>
                        <th class="text-center">Prix</th>
                        <th class="text-center">Quantiter</th>
                        <th class="text-center">Id categorie</th>
                        <th class="text-center">NaturabuyId</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in selectCatStore.getAllProducts" :key="product.id">
                        <td class="text-center">{{ product.id }}</td>
                        <td class="text-center">{{ product.name }}</td>
                        <td class="text-center">{{ product.price }}</td>
                        <td class="text-center">{{ product.quantity }}</td>
                        <td class="text-center">{{ product.categorieId }}</td>
                        <td class="text-center">{{ product.naturaBuyId }}</td>
                        <td class="text-center">
                            <button class="btn btn-primary">Modifier</button>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-danger" @click="deleteProduct(product.id)">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container-categorie-table mt-5">
            <div class="d-flex justify-content-between px-3 pb-3">
                <h2 class="text-white">Vos produits :</h2>
                <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter</button>
            </div>
            <table class="table table-striped" aria-describedby="table of categorie">
                <thead class="head">
                    <tr>
                        <th class="text-center">Id</th>
                        <th class="text-center">Nom</th>
                        <th class="text_center">Naturabuy Id</th>
                        <th class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categorie in selectCatStore.getListOfCategorie" :key="categorie.id">
                        <td class="text-center">{{ categorie.id }}</td>
                        <td class="text-center">{{ categorie.name }}</td>
                        <td class="text-center">{{ categorie.naturabuyId }}</td>
                        <td class="text-center">
                            <button class="btn btn-danger">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <AdminModal/>
</template>

<style scoped>
    .admin-container{
        margin-top: 80px;
    }

    .table{
        overflow-x: scroll;
    }

    .head{
        background-color: white;
    }
</style>