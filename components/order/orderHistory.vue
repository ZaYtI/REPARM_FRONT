<template>
    <div class="orderList w-100 px-3">
        <table class="table table-borderless shadow">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Etat</th>
                    <th scope="col">Produits</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123456</td>
                    <td>20 mars 2024</td>
                    <td>100 €</td>
                    <td>En cours</td>
                    <td class="align-middle text-center">
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Afficher les produits
                        </button>
                    </td>
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
