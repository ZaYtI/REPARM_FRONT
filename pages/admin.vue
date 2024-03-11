<script setup>
const authStore = useAuthStore();

const selectCatStore = useSelectedCatStore();

const weapons = ref(null)

const backward = ref('<<')
const forward = ref('>>')

async function deleteProduct(productId) {
    try {
        const response = await fetch(`https://reparm-api-without-docker.onrender.com/product/delete/${productId}`, {
            headers: {
                'Authorization': `Bearer ${authStore.getToken}`,
            },
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error('Erreur lors de la requête HTTP');
        }
        productIsLoaded.value = false
        await selectCatStore.setAllProduct();
        paginateProduct.value = []
        await paginateProducts()
        productIsLoaded.value = true
    } catch (error) {
        console.error(error)
    }
}

async function deleteOrder(orderId){
    try {
        const response = await fetch(`https://reparm-api-without-docker.onrender.com/commande/delete/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${authStore.getToken}`,
            },
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error('Erreur lors de la requête HTTP');
        }
        ordersIsLoad.value = false
        await authStore.setAllOrder();
        paginateOrder.value = []
        await paginateOrders()
        ordersIsLoad.value = true
    } catch (error) {
        console.error(error)
    }
}


function loadProduct() {
    if (productIsLoaded.value) {
        productIsLoaded.value = false
    } else {
        productIsLoaded.value = true
    }
}

const productIsLoaded = ref(false)
const categorieIsLoaded = ref(false)
const isAdmin = ref(false)
const allIsLoad = ref(false)
const currentPaginationIndex = ref(0)
const paginateProduct = ref([])
const paginateOrder = ref([])
const currentPaginateOrderIndex = ref(0)
const ordersIsLoad = ref(false)


async function paginateProducts() {
    let products = selectCatStore.getAllProducts;
    paginateProduct.value = []
    for (let i = 0; i < products.length; i += 10) {
        const productSliced = products.slice(i, i + 10)
        paginateProduct.value.push(productSliced)
    }
}

async function paginateOrders() {
    let orders = authStore.getAllOrder;
    paginateOrder.value = []
    for (let i = 0; i < orders.length; i += 10) {
        const ordersliced = orders.slice(i, i + 10)
        paginateOrder.value.push(ordersliced)
    }
}

onMounted(async () => {
    let categorie = selectCatStore.getListOfCategorie;
    let products = selectCatStore.getAllProducts;
    if (products == null || products == undefined || products.length == 0) {
        await selectCatStore.setAllProduct();
        productIsLoaded.value = true
    }
    await paginateProducts();
    if (categorie == null || categorie == undefined || categorie.length == 0) {
        await selectCatStore.setListOfCategorie();
        categorieIsLoaded.value = true
    }
    let orders = authStore.getAllOrder
    if(orders == null || orders == undefined || orders.length == 0){
        await authStore.setAllOrder();
        ordersIsLoad.value = true
    }
    await paginateOrders()
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
        navigateTo('/login')
    }
})

watch(
    () => authStore.getIsLoggedIn,
    async (newgetIsLoggedIn, oldgetIsLoggedIn) => {
        if (newgetIsLoggedIn) {
            if (authStore.getProfile.roleId == 2) {
                isAdmin.value = true
                if (productIsLoaded.value && categorieIsLoaded.value && ordersIsLoad) {
                    allIsLoad.value = true;
                }
            } else {
                navigateTo('/')
            }
        }
    }
)

watch(
    categorieIsLoaded,
    async (newValue, oldValue) => {
        if (newValue) {
            if (isAdmin.value && productIsLoaded.value && ordersIsLoad) {
                allIsLoad.value = true
            }
        }
        else{
            allIsLoad.value = false
        }
    }
)

watch(() =>
    ordersIsLoad,
    async (newValue, oldValue) => {
        if (newValue) {
            if (isAdmin.value && categorieIsLoaded && productIsLoaded ) {
                allIsLoad.value = true
                await paginateOrders()
            }
        }else{
            allIsLoad.value = false
        }
    }
)

watch(() =>
    productIsLoaded,
    async (newValue, oldValue) => {
        if (newValue) {
            if (isAdmin.value && categorieIsLoaded && ordersIsLoad) {
                allIsLoad.value = true
                await paginateProduct()
            }
        }else{
            allIsLoad.value = false
        }
    }
)

</script>


<template>
    <div :class="{ 'd-none': !allIsLoad }">
        <div>
            <Banniere title="ESPACES CLIENT" title-color="#B54A29" bottom-border />
        </div>
        <div class="container-xl admin-container">
            <div class="container-weapons-table">
                <div :class="{ 'd-none': !productIsLoaded }">
                    <div class="d-flex justify-content-between px-3 pb-3">
                        <h2 class="text-white">Vos produits :</h2>
                        <button class="btn btn-success" type="button" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Ajouter</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in paginateProduct[currentPaginationIndex]" :key="product.id">
                                <td class="text-center">{{ product.id }}</td>
                                <td class="text-center">{{ product.name }}</td>
                                <td class="text-center">{{ product.price }}</td>
                                <td class="text-center">{{ product.quantity }}</td>
                                <td class="text-center">{{ product.categorieId }}</td>
                                <td class="text-center">{{ product.naturaBuyId }}</td>
                                <td class="text-center">
                                    <button class="btn btn-danger" @click="deleteProduct(product.id)">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination-container" v-if="paginateProduct.length > 1">
                        <div class="shadow bg-body-tertiary rounded">
                            <button class="btn border-0" :disabled="currentPaginationIndex == 0"
                                @click="currentPaginationIndex--">
                                {{ backward }}
                            </button>
                            <button class="btn border-0" :class="{ 'active': currentPaginationIndex == index }"
                                v-for="(item, index) in paginateProduct" :key="index" :id="index"
                                @click="currentPaginationIndex = index">{{ index }}</button>
                            <button class="btn border-0" :disabled="currentPaginationIndex == paginateProduct.length - 1"
                                @click="currentPaginationIndex++">
                                {{ forward }}
                            </button>
                        </div>
                    </div>
                </div>
                <div :class="{ 'd-none': !ordersIsLoad }">
                    <div class="d-flex justify-content-between px-3 pb-3 mt-4">
                        <h2 class="text-white">Vos Commandes :</h2>
                    </div>
                    <table class="table table-striped" aria-describedby="table of order">
                        <thead class="head">
                            <tr>
                                <th class="text-center">Id</th>
                                <th class="text-center">userId</th>
                                <th class="text-center">email</th>
                                <th class="text-center">Phone</th>
                                <th class="text-center">paiement</th>
                                <th class="text-center">recue</th>
                                <th class="text-center">NaturabuyOrder</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in paginateOrder[currentPaginateOrderIndex]" :key="order.id">
                                <td class="text-center">{{ order.id }}</td>
                                <td class="text-center">{{ order.userId }}</td>
                                <td class="text-center">{{ order.user.email }}</td>
                                <td class="text-center">{{ order.user.phone }}</td>
                                <td class="text-center">{{ order.payment }}</td>
                                <td class="text-center">{{ order.received }}</td>
                                <td class="text-center">{{ order.isNaturaBuyOrder }}</td>
                                <td class="text-center">
                                    <button class="btn btn-primary">Modifier</button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-danger" @click="deleteOrder(order.id)">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
                <div class="d-flex justify-content-center spinner-container-tab" :class="{ 'd-none': ordersIsLoad }">
                    <div class="spinner-border mx-auto" style="width: 10rem; height: 10rem;" role="status"></div>
                </div>
                <div class="d-flex justify-content-center spinner-container-tab" :class="{ 'd-none': productIsLoaded }">
                    <div class="spinner-border mx-auto" style="width: 10rem; height: 10rem;" role="status"></div>
                </div>
            </div>
        </div>
        <AdminModal @sendToParent="loadProduct" />
    </div>
    <div class="d-flex justify-content-center spinner-container" :class="{ 'd-none': allIsLoad }">
        <div class="spinner-border mx-auto" style="width: 10rem; height: 10rem;" role="status"></div>
    </div>
</template>

<style scoped>
.container-weapons-table {
    overflow-x: scroll;
}

.active {
    background-color: #B54A29;
    color: white;
}

.pagination-container {
    width: 100%;
    display: flex;
    justify-content: center;
    background: transparent;
}

.admin-container {
    margin-top: 80px;
}

.table {
    overflow-x: scroll;
}

.spinner-container {
    align-items: center;
    height: 100vh;
}

.spinner-container-tab {
    align-items: center;
}

.spinner-border {
    color: #B54A29;
}

.head {
    background-color: white;
}
</style>