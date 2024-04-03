<script setup>
const authStore = useAuthStore();
const emit = defineEmits(['sendToParent'])
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Produit :</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="authStore.setProductToUpdate(null)"></button>
                </div>
                <div class="modal-body">
                    <AdminCreateOrUpdateProduct @load-product="() => emit('sendToParent')" />
                </div>
            </div>
        </div>
    </div>
</template>