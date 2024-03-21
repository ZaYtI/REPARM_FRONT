<script setup lang="ts">

const authStore = useAuthStore();

const showProduct = ref(null);

</script>


<template>
    <div class="orderList w-100 px-3">
        <table v-for="order in authStore.getUserOrder" class="table table-borderless shadow" aria-describedby="order-info-table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Etat</th>
                    <th scope="col">Création</th>
                    <th scope="col">Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ order.id }}</td>
                    <td>{{ order.price }}€</td>
                    <td>En cours</td>
                    <td>{{ order.createdAt}}</td>
                    <td>{{ order.updatedAt}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.orderList table {
    border-radius: 10px;
    overflow: hidden;
}
</style>
