<script setup>

const authStore = useAuthStore();

const currentPage = ref(1);
const ordersPerPage = ref(5);
const totalPages = ref(null)
const previousIsVisible = computed(() => {
    return currentPage.value > 1;
});

const nextIsVisible = computed(() => {
    totalPages.value = Math.ceil(authStore.getUserOrder.length / ordersPerPage.value);
    return currentPage.value < totalPages.value;
});

const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * ordersPerPage.value;
    const end = start + ordersPerPage.value;
    return authStore.getUserOrder.slice(start, end);
});

</script>


<template>
    <div class="orderList w-100 px-3">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="order-title px-3 mb-4">Historique des commandes:</h3>
            <div class="paginate d-flex align-items-center justify-content-between">
                <button @click="currentPage--" class="btn border-0 btn-paginate" :disabled="!previousIsVisible">
                    << </button>
                        <p class="p-0 m-0">{{ currentPage }}...{{ totalPages }}</p>
                        <button @click="currentPage++" class="btn border-0 btn-paginate" :disabled="!nextIsVisible">
                            >>
                        </button>
            </div>
        </div>
        <div v-for="order in paginatedOrders" class="p-1 mb-2 table-wrapper rounded">
            <table class="table table-borderless " aria-describedby="order-info-table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Paiment</th>
                        <th scope="col">Recue</th>
                        <th scope="col">Création</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ order.id }}</td>
                        <td>{{ order.price }}€</td>
                        <td v-if="order.payment">
                            <span class="success-order">Valider</span>
                        </td>
                        <td v-else>
                            <span class="wait-order">En attente</span>
                        </td>
                        <td v-if="order.received">
                            <span class="succes-order">Recue</span>
                        </td>
                        <td v-else>
                            <span class="wait-order">En cours</span>
                        </td>
                        <td>{{ order.createdAt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.wait-order {
    background-color: rgb(251, 91, 32);
    border-radius: 1rem;
    text-align: center;
    color: white;
    padding: 5px;
}

.success-order {
    background-color: green;
    border-radius: 1rem;
    text-align: center;
    color: white;
    padding: 5px;
}

.table-wrapper {
    background-color: white;
}

.orderList table {
    border-radius: 10px;
    overflow: hidden;
}

.order-title {
    color: white;
    position: relative;
}

.order-title::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 1rem;
    height: 3px;
    width: 92%;
    background-color: #B54A29;
}

.paginate {
    font-size: 1.5rem;
    color: white;
}

.btn-paginate {
    color: white;
    font-size: 1.5rem;
}

.svg {
    fill: black;
}
</style>
