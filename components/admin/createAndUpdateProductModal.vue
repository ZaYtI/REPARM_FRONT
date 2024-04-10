<script setup>

const catStore = useSelectedCatStore();

const authStore = useAuthStore();


const props = defineProps({
  product: {
    type: Object,
    required: false,
  }
})

const emit = defineEmits(['loadProduct'])

const naturaBuyId = ref('');
const name = ref('');
const price = ref(0);
const quantity = ref(0);
const duree = ref(0);
const stock = ref(false);
const description = ref('');
const categorieId = ref('');
const sendImages = ref([])
const selectedImages = ref([]);
const showError = ref(false);
const naturaBuyIdError = ref(false);
const priceError = ref(false);
const quantityError = ref(false);
const descriptionError = ref(false);
const selectedImagesError = ref(false);
const nameError = ref(false);
const categorieIdError = ref(false);
const formIsValid = ref(true);
const imageToDeletedId = ref([])

const handleSelectImage = (event) => {
  const input = event.target;
  if (input.files) {
    const file = input.files[0];
    const allowedExtensions = ["jpg", "jpeg", "png"];

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      showError.value = false;
      const reader = new FileReader();
      sendImages.value.push(file)

      reader.onload = (e) => {
        const base64Image = e.target.result;
        selectedImages.value.push(base64Image);
      };

      reader.readAsDataURL(file);
    } else {
      showError.value = true;
    }
  }
};

async function uploadImages(productId) {
  const formData = new FormData();

  sendImages.value.forEach((file, index) => {
    formData.append(`files`, file);
  });

  try {
    const response = await fetch(`https://reparm-api-without-docker.onrender.com/upload-images/uploadImages/${productId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la requête HTTP');
    }
    await catStore.setAllProduct()
  } catch (error) {
    console.error(error);
  }
}

async function fetchDeleteImage(imageId) {
  try {
    const response = await fetch(`https://reparm-api-without-docker.onrender.com/upload-images/delete/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la requête HTTP');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
  }
}

async function deleteUnselectedImages(image) {
  const product = authStore.getSelectedProductToUpdate;
  let productMap = new Map();
  product.images.forEach(image => {
    productMap.set(image.url, image.id)
  })
  if (productMap.has(image)) {
    const imageId = productMap.get(image);
    imageToDeletedId.value.push(imageId)
  }
  selectedImages.value = selectedImages.value.filter(item => item !== image)
}



function initForm() {
  naturaBuyId.value = ''
  name.value = ''
  price.value = 0
  quantity.value = 0
  duree.value = 0
  description.value = ''
  categorieId.value = 0
  if (selectedImages.value.length != 0) {
    selectedImages.value = selectedImages.value.shift();
  }
  selectedImages.value = []
}

function initFormWithProduct(product) {
  naturaBuyId.value = product.naturaBuyId
  name.value = product.name
  price.value = product.price
  quantity.value = product.quantity
  duree.value = product.duree
  description.value = product.description
  categorieId.value = product.categorieId
  if (selectedImages.value.length != 0) {
    selectedImages.value = [];
  }
  for (const element of product.images) {
    selectedImages.value.push(element.url);
  }
}



async function checkForm() {
  formIsValid.value = true;

  const validateField = (fieldValue, errorField, condition = false) => {
    const isValid = !condition;
    errorField.value = !isValid;
    if (!isValid) formIsValid.value = false;
    return isValid;
  };

  validateField(naturaBuyId.value, naturaBuyIdError, !naturaBuyId.value);
  validateField(name.value, nameError, !name.value);
  validateField(price.value, priceError, price.value <= 0 || price.value == null);
  validateField(quantity.value, quantityError, quantity.value < 0 || quantity.value == null);
  validateField(description.value, descriptionError, !description.value);
  validateField(selectedImages.value, selectedImagesError, !selectedImages.value || selectedImages.value.length === 0);
  validateField(categorieId.value, categorieIdError, !categorieId.value);
}

const submitForm = async (event) => {
  event.preventDefault();
  await checkForm()
  if (formIsValid.value) {
    const data = {
      naturaBuyId: naturaBuyId.value,
      name: name.value,
      price: parseFloat(price.value),
      quantity: parseInt(quantity.value, 10),
      duree: parseInt(duree.value, 10),
      description: description.value,
      categorieId: parseInt(categorieId.value, 10)
    };
    try {
      let response;
      let productId;
      if (authStore.getSelectedProductToUpdate == null) {
        response = await fetch('https://reparm-api-without-docker.onrender.com/product/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authStore.getToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        productId = responseData.id;
      } else {
        productId = authStore.getSelectedProductToUpdate.id;
        response = await fetch('https://reparm-api-without-docker.onrender.com/product/update/' + productId, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authStore.getToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (imageToDeletedId.value.length != 0) {
          for (const imageId of imageToDeletedId.value) {
            fetchDeleteImage(imageId)
          }
          imageToDeletedId.value = [];
        }
      }
      if (!response.ok) {
        throw new Error('Erreur lors de la requête HTTP');
      }
      await uploadImages(productId)
      initForm()
      emit('loadProduct')
    } catch (error) {
      console.error(error);
    }
  }
};

watch(
  () => authStore.getSelectedProductToUpdate,
  (newValue, oldValue) => {
    if (newValue != null) {
      initFormWithProduct(newValue)
    } else {
      initForm()
    }
  }
)

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
                    <div class="container">
                        <form @submit.prevent="submitForm">
                        <div class="d-flex">
                            <div class="pe-2">
                            <label class="form-label" for="naturaBuyId">Natura Buy ID:</label>
                            <input class="form-control" type="text" id="naturaBuyId" v-model="naturaBuyId" />
                            <small class="text-danger" v-if="naturaBuyIdError">Veuillez rentrer l'id de vente naturabuy</small>
                            </div>
                            <div>
                            <label class="form-label" for="categorie">Categorie :</label>
                            <select class="form-select" aria-label="Default select example" v-model="categorieId">
                                <option selected :value="null">Open this select menu</option>
                                <option v-for="elt in catStore.getListOfCategorie" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
                            </select>
                            <small class="text-danger" v-if="categorieIdError">Veuillez selectionner la categorie du produit</small>
                            </div>
                        </div>
                        <div>
                            <label class="form-label" for="name">Nom:</label>
                            <input class="form-control" type="text" id="name" v-model="name" />
                            <small class="text-danger" v-if="nameError">Veuillez entrer le nom du produits</small>
                        </div>
                        <div class="d-flex">
                            <div class="pe-2">
                            <label class="form-label" for="price">Price:</label>
                            <input class="form-control" type="number" id="price" v-model="price" />
                            <small class="text-danger" v-if="priceError">Veuillez entrer le prix du produit</small>
                            </div>
                            <div>
                            <label class="form-label" for="quantity">Quantity:</label>
                            <input class="form-control" type="number" id="quantity" v-model="quantity" />
                            <small class="text-danger" v-if="quantityError">Veuillez entrer la quantiter disponible du produit</small>
                            </div>
                        </div>
                        <div>
                            <label class="form-label" for="description">Description:</label>
                            <textarea class="form-control" id="description" v-model="description"></textarea>
                            <small class="text-danger" v-if="descriptionError">Veuillez entrer la description du produit</small>
                        </div>


                        <div class="caroussel_container p-3">
                            <div v-if="selectedImages.length > 0" id="carouselExampleIndicators" class="carousel slide">
                            <div class="carousel-inner">
                                <div v-for="(image, index) in selectedImages" :key="index" :id="index" class="carousel-item active">
                                <img :src="image" :id="index" class="caroussel_images d-block w-100" alt="...">
                                <button type="button" @click="deleteUnselectedImages(image)" class="delete_image">X</button>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            </div>
                        </div>
                        <div class="input-group mb-3 mt-4">
                            <label class="input-group-text" for="inputGroupFile01">Select files</label>
                            <input type="file" class="form-control" id="inputGroupFile01" @change="handleSelectImage" />
                        </div>
                        <small v-if="selectedImagesError" class="text-danger">Veuillez entrer une image</small>
                        <small v-if="showError" class="text-danger">Fichier invalide</small>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary mx-auto">Enregistrer</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.selected-image-container {
  padding: 1rem;
  background-color: rgb(211, 208, 208);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-height: 200px;
  overflow-y: scroll;
}

.image-wrapper {
  position: relative;
}

.carousel-item {
  position: relative;
}

img {
  aspect-ratio: 16/11;
}

.selected-images {
  max-width: 100px;
  margin: 1rem;
}

.image-delete {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: red;
  position: absolute;
  border: none;
  content: '';
  top: 0;
  left: 0;
  color: white;
  transform: translate(25%, 25%);
}

.caroussel_container {
  width: 100%;
  max-height: 280px;
}

.delete_image {
  position: absolute;
  z-index: 3000000000000;
  color: red;
  top: 0;
  left: 0;
  background: none;
  box-shadow: none;
  border: none;
  font-size: 1.25rem;
}
</style>