<script setup>
import CreateAndUpdateProductModal from '~/components/admin/createAndUpdateProductModal.vue';

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
        productIsLoaded.value = true
    } catch (error) {
        console.error(error)
    }
}

async function deleteOrder(orderId) {
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
        ordersIsLoad.value = true
    } catch (error) {
        console.error(error)
    }
}

const productIsLoaded = ref(false)
const allIsLoad = ref(false)
const paginateOrder = ref([])
const currentPageIndexProduct = ref(1);
const currentPageIndexOrder = ref(1);
const ordersIsLoad = ref(false)
const itemsPerPage = ref(10);

const totalPagesProduct = computed(() => Math.ceil(selectCatStore.getAllProducts.length / itemsPerPage.value));

const totalPagesOrder = computed(() => Math.ceil(authStore.getAllOrder.length / itemsPerPage.value));


const previousOrderIsVisible = computed(() => {
    return currentPageIndexOrder.value > 1;
});

const nextOrderIsVisible = computed(() => {
    return currentPageIndexOrder.value < totalPagesOrder.value;
});

const previousProductIsVisible = computed(() => {
    return currentPageIndexProduct.value > 1;
});

const nextProductIsVisible = computed(() => {
    return currentPageIndexProduct.value < totalPagesProduct.value;
});

const currentProducts = computed(() => {
    const sortedProducts = selectCatStore.getAllProducts.toSorted((a, b) => a.id - b.id);
    const startIndex = (currentPageIndexProduct.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return sortedProducts.slice(startIndex, endIndex);
});

const currentOrders = computed(() => {
    const sortedOrders = authStore.getAllOrder.toSorted((a, b) => a.id - b.id);
    const startIndex = (currentPageIndexOrder.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return sortedOrders.slice(startIndex, endIndex);
});

const router = useRouter();

onMounted(async () => {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
        router.replace('/login');
    } else {
        await authStore.profile();
    }
    setTimeout(() => {
        allIsLoad.value = true;
    }, 1000);
})

</script>


<template>
    <div :class="{ 'd-none': !allIsLoad }">
        <div>
            <Banniere title="ESPACES CLIENT" title-color="#B54A29" bottom-border />
        </div>
        <div class="container-xl admin-container">
            <div class="container-weapons-table">
                <div :class="{ 'd-none': currentProducts == undefined }">
                    <div class="d-flex justify-content-between px-3 pb-3">
                        <h2 class="text-white">Vos produits :</h2>
                        <div class="d-flex">
                            <div class=" d-flex align-items-center paginate">
                                <button @click="currentPageIndexProduct--" class="btn border-0 btn-paginate"
                                    :disabled="!previousProductIsVisible">
                                    << </button>
                                        <p class="p-0 m-0">{{ currentPageIndexProduct }}...{{ totalPagesProduct }}</p>
                                        <button @click="currentPageIndexProduct++" class="btn border-0 btn-paginate"
                                            :disabled="!nextProductIsVisible">
                                            >>
                                        </button>
                            </div>
                            <button class="btn btn-success" type="button" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                @click="authStore.setProductToUpdate(null)">Ajouter</button>
                        </div>
                    </div>
                    <div class="table-responsive rounded-3">
                        <table class="table table-striped" aria-describedby="table of product">
                            <thead class="head">
                                <tr>
                                    <th class="text-center">Id</th>
                                    <th class="text-center">Nom</th>
                                    <th class="text-center">Prix</th>
                                    <th class="text-center">Quantiter</th>
                                    <th class="text-center">NaturabuyId</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody class="rounded-bottom">
                                <tr v-for="product in currentProducts" :key="product.id">
                                    <td class="text-center">{{ product.id }}</td>
                                    <td class="text-center">{{ product.name }}</td>
                                    <td class="text-center">{{ product.price }}</td>
                                    <td class="text-center">{{ product.quantity }}</td>
                                    <td class="text-center">{{ product.naturaBuyId }}</td>
                                    <td>
                                        <div class="d-flex justify-content-around">
                                            <button class="btn btn-primary" type="button" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                @click="authStore.setProductToUpdate(product)">Modifier</button>
                                            <button class="btn btn-danger ms-2"
                                                @click="deleteProduct(product.id)">Supprimer</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="d-flex justify-content-between px-3 pb-3 mt-4">
                        <h2 class="text-white">Vos Commandes :</h2>
                        <div class=" d-flex align-items-center paginate">
                            <button @click="currentPageIndexOrder--" class="btn border-0 btn-paginate"
                                :disabled="!previousOrderIsVisible">
                                << </button>
                                    <p class="p-0 m-0">{{ currentPageIndexOrder }}...{{ totalPagesOrder }}</p>
                                    <button @click="currentPageIndexOrder++" class="btn border-0 btn-paginate"
                                        :disabled="!nextOrderIsVisible">
                                        >>
                                    </button>
                        </div>
                    </div>
                    <div class="table-responsive rounded-3">
                        <table class="table table-striped" aria-describedby="table of order">
                            <thead class="head">
                                <tr>
                                    <th class="text-center">Id</th>
                                    <th class="text-center">userId</th>
                                    <th class="text-center">email</th>
                                    <th class="text-center">Phone</th>
                                    <th class="text-center">paiement</th>
                                    <th class="text-center">Prix</th>
                                    <th class="text-center">recue</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in currentOrders" :key="order.id">
                                    <td class="text-center">{{ order.id }}</td>
                                    <td class="text-center">{{ order.userId }}</td>
                                    <td class="text-center"><a :href="'mailto:' + order.user.email">{{
        order.user.email }}</a></td>
                                    <td class="text-center">{{ order.user.phone }}</td>
                                    <td class="text-center span-order" v-if="order.payment">
                                        <span class="success-order">Valider</span>
                                    </td>
                                    <td class="text-center span-order" v-else>
                                        <span class="wait-order">En attente</span>
                                    </td>
                                    <td class="text-center span-order">{{ order.price }}€</td>
                                    <td class="text-center span-order" v-if="order.received">
                                        <span class="success-order">Recue</span>
                                    </td>
                                    <td class="text-center span-order" v-else>
                                        <span class="wait-order">En cours</span>
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-around">
                                            <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#orderModalTop" @click="authStore.setOrderToUpdateSelected(order)" :disabled="order.received && order.payment">Modifier</button>
                                            <button :disabled="order.payment" class="btn btn-danger ms-2"
                                                @click="deleteOrder(order.id)">Supprimer</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <CreateAndUpdateProductModal />
        <AdminUpdateOrderModal />
    </div>
    <div class="d-flex justify-content-center spinner-container" :class="{ 'd-none': allIsLoad }">
        <div class="spinner-border mx-auto" style="width: 10rem; height: 10rem;" role="status"></div>
    </div>
</template>


<style scoped>
.container-weapons-table {
    overflow-x: scroll;
}

.wait-order {
    background-color: rgb(251, 91, 32);
    border-radius: 0.5rem;
    text-align: center;
    color: white;
    padding: 5px;
}

.success-order {
    background-color: green;
    border-radius: 0.5rem;
    text-align: center;
    color: white;
    padding: 5px;
}

.span-order {
    min-width: 110px;
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

.paginate {
    font-size: 1.5rem;
    color: white;
}

.btn-paginate {
    color: white;
    font-size: 1.5rem;
}
</style>