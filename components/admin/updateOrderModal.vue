<script setup>
const authStore = useAuthStore();

const order = ref(null);
const defaultValueForPayment = ref(null)
const defaultValueForReceived = ref(null)
const newValueForPayment = ref(null)
const newValueForReceived = ref(null)

watch(() => authStore.getSelectedOrderToUpdate,
    async(newValue,oldValue) => {
        console.log(newValue);
        if(newValue){
            order.value = newValue;
            defaultValueForPayment.value = order.value.payment;
            defaultValueForReceived.value = order.value.received;
            newValueForPayment.value = null;
            newValueForReceived.value = null;
        }
})

function toggleReceived(){
    if(newValueForReceived.value != null && newValueForReceived.value != defaultValueForReceived.value){
        newValueForReceived.value = !newValueForReceived.value
    }else{
        newValueForReceived.value = !defaultValueForReceived.value
    }
}

function togglePayment(){
    if(newValueForPayment.value != null && newValueForPayment.value != defaultValueForPayment.value){
        newValueForPayment.value = !newValueForPayment.value
    }else{
        newValueForPayment.value = !defaultValueForPayment.value
    }
}
</script>

<template>
    <div class="modal fade" id="orderModalTop" tabindex="-1" aria-labelledby="orderModal" aria-hidden="true" ref="orderModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="orderModal">Status de la commande :</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="order!=null" class="modal-body">
                    <div class="d-flex justify-content-center w-100">
                        <button class="btn dropdown-toggle mx-auto rounded shadow w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                            Afficher les information de la commande
                        </button>
                    </div>
                    <div class="collapse show" id="collapseExample">
                        <div class="card card-body mb-3">
                            <div class="d-flex justify-content-around">
                            <p>id de la commande : {{ order.id }}</p>
                        </div>
                        <div class="d-flex justify-content-around">
                            <div class=" order-status d-flex">
                                <p>Paiement :</p>
                                <div class="text-center span-order" v-if="order.payment">
                                    <span class="success-order">Valider</span>
                                </div>
                                <div class="text-center span-order" v-else>
                                    <span class="wait-order">En attente</span>
                                </div>
                            </div>
                            <div class=" order-status d-flex">
                            <p>Livraison :</p>
                            <div class="text-center span-order" v-if="!(defaultValueForReceived == false && newValueForReceived == null || newValueForReceived == false)">
                                <span class="success-order">Valider</span>
                            </div>
                            <div class="text-center span-order" v-else>
                                <span class="wait-order">En cours</span>
                            </div>
                        </div>
                        </div>
                        <p class="text-center">Prix de la commande : {{ order.price }}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around  mt-3">
                        <button class="btn btn-success" :disabled="order.payment" @click="togglePayment()">Valider le paiement</button>
                        <button v-if="(defaultValueForReceived == false && newValueForReceived == null || newValueForReceived == false)" class="btn btn-success" :disabled="order.received" @click="toggleReceived()">Valider le recue</button>
                        <button v-else class="btn btn-danger" :disabled="order.received" @click="toggleReceived()">Annuler le recue</button>
                    </div> 
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.success-order {
    background-color: green;
    border-radius: 0.5rem;
    text-align: center;
    color: white;
    padding : 0.2rem;
    margin-left: 0.2rem;
}

.order-status{
    min-width: 170px;
}

.wait-order {
    background-color: rgb(251, 91, 32);
    border-radius: 0.5rem;
    text-align: center;
    color: white;
    padding : 0.2rem;
    margin-left: 0.2rem;
}

</style>