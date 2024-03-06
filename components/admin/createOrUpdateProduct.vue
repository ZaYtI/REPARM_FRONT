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
const barrePrice = ref(0);
const quantity = ref(0);
const duree = ref(0);
const newProduct = ref(false);
const stock = ref(false);
const ean = ref('');
const description = ref('');
const categorieId = ref('');
const sendImages = ref([])
const selectedImages = ref([]);
const showError = ref(false);

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
    const response = await fetch(`https://reparm-api-without-docker.onrender.com/product/uploadImages/${productId}`, {
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


function initForm() {
  naturaBuyId.value = null,
    name.value = null,
    price.value = null,
    barrePrice.value = null,
    quantity.value = null,
    duree.value = null,
    newProduct.value = null,
    stock.value = null,
    ean.value = null,
    description.value = null,
    categorieId.value = null,
    selectedImages.value = []
}

const submitForm = async (event) => {
  event.preventDefault();

  const data = {
    naturaBuyId: naturaBuyId.value,
    name: name.value,
    price: parseFloat(price.value),
    barrePrice: parseFloat(barrePrice.value),
    quantity: parseInt(quantity.value, 10),
    duree: parseInt(duree.value, 10),
    new: newProduct.value,
    stock: stock.value,
    ean: ean.value,
    description: description.value,
    categorieId: parseInt(categorieId.value, 10)
  };


  try {
    const response = await fetch('https://reparm-api-without-docker.onrender.com/product/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête HTTP');
    }
    emit('loadProduct')
    const responseData = await response.json();
    const productId = responseData.id;
    await uploadImages(productId)
    initForm()
    emit('loadProduct')
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="d-flex">
        <div class="pe-2">
          <label class="form-label" for="naturaBuyId">Natura Buy ID:</label>
          <input class="form-control" type="text" id="naturaBuyId" v-model="naturaBuyId" />
        </div>
        <div>
          <label class="form-label" for="categorie">Categorie :</label>
          <select class="form-select" aria-label="Default select example" v-model="categorieId">
            <option selected :value="null">Open this select menu</option>
            <option v-for="elt in catStore.getListOfCategorie" :key="elt.id" :value="elt.id">{{ elt.name }}</option>
          </select>
        </div>
      </div>
      <div>
        <label class="form-label" for="name">Nom:</label>
        <input class="form-control" type="text" id="name" v-model="name" />
      </div>
      <div class="d-flex">
        <div class="pe-2">
          <label class="form-label" for="price">Price:</label>
          <input class="form-control" type="number" id="price" v-model="price" />
        </div>
        <div>
          <label class="form-label" for="barrePrice">Barre Price:</label>
          <input class="form-control" type="number" id="barrePrice" v-model="barrePrice" />
        </div>
      </div>
      <div>
        <label class="form-label" for="quantity">Quantity:</label>
        <input class="form-control" type="number" id="quantity" v-model="quantity" />
      </div>
      <div>
        <label class="form-label" for="description">Description:</label>
        <textarea class="form-control" id="description" v-model="description"></textarea>
      </div>


      <div class="caroussel_container p-3">
        <div v-if="selectedImages.length > 0" id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-inner">
            <div v-for="(image, index) in selectedImages" :key="index" class="carousel-item active">
              <img :src="image" class=" caroussel_images d-block w-100" alt="...">
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
      <small v-if="showError" class="text-danger">Fichier invalide</small>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary mx-auto">Enregistrer</button>
      </div>
    </form>
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
</style>

  