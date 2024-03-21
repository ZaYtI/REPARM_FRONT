<script setup>
import { ref } from 'vue';

const authStore = useAuthStore();

const props = defineProps({
  profilPage: {
    type: Boolean,
    required: false,
  }
})

const formData = ref({
  civility: '',
  lastName: '',
  firstName: '',
  phone: '',
  country: '',
  address: '',
  email: '',
  password: '',
  birthDate: '',
  city: ''
});


const confirmPassword = ref('');
const confirmPasswordAlert = ref(false)
const lastNameAlertVisible = ref(false);
const firstNameAlertVisible = ref(false);
const phoneAlertVisible = ref(false);
const birthDateAlertVisible = ref(false);
const countryAlertVisible = ref(false);
const cityAlertVisible = ref(false);
const addressAlertVisible = ref(false);
const emailAlertVisible = ref(false);
const passwordAlertVisible = ref(false);

function handleChangeCivility(event) {
  formData.value.civility = event.target.value;
}

function isMajor() {
  let date = new Date();
  let year = date.getFullYear();
  let birthYear = formData.value.birthDate.split('-')[0];
  if (year - birthYear < 18) {
    birthDateAlertVisible.value = true
  } else {
    birthDateAlertVisible.value = false
  }
}

function checkIsPhone() {
  let phone = formData.value.phone;
  if (phone.length !== 10) {
    phoneAlertVisible.value = true;
  } else {
    phoneAlertVisible.value = false;
  }
}

function handleSubmit() {
  validateField(formData.value.lastName, lastNameAlertVisible);
  validateField(formData.value.firstName, firstNameAlertVisible);
  validateField(formData.value.phone, phoneAlertVisible);
  validateField(formData.value.birthDate, birthDateAlertVisible);
  validateField(formData.value.country, countryAlertVisible);
  validateField(formData.value.city, cityAlertVisible);
  validateField(formData.value.address, addressAlertVisible);
  validateField(formData.value.email, emailAlertVisible);
  validateField(formData.value.password, passwordAlertVisible);
  isMajor()
  checkIsPhone()
  if (!lastNameAlertVisible.value && !firstNameAlertVisible.value && !phoneAlertVisible.value && !birthDateAlertVisible.value && !countryAlertVisible.value && !cityAlertVisible.value && !addressAlertVisible.value && !emailAlertVisible.value && !passwordAlertVisible.value && !confirmPasswordAlert.value) {
    authStore.register(formData.value)
  }
}

function validateField(field, visibilityRef) {
  if (!field) {
    visibilityRef.value = true;
  } else {
    visibilityRef.value = false;
  }
}

onMounted(() => {
  if (props.profilPage) {
    const user = authStore.getProfile;
    if (user != null || user != undefined) {
      formData.value.civility = user.civility;
      formData.value.lastName = user.lastName;
      formData.value.firstName = user.firstName;
      formData.value.phone = user.phone;
      formData.value.country = user.country;
      formData.value.address = user.address;
      formData.value.email = user.email;
      formData.value.birthDate = user.birthDate;
      formData.value.city = user.city;
    }
  }
})


watch(()=>authStore.getProfile,async(newValue,oldValue) => {
  if(newValue){
    const user = newValue;
    if (user != null || user != undefined) {
      formData.value.civility = user.civility;
      formData.value.lastName = user.lastName;
      formData.value.firstName = user.firstName;
      formData.value.phone = user.phone;
      formData.value.country = user.country;
      formData.value.address = user.address;
      formData.value.email = user.email;
      formData.value.birthDate = user.birthDate;
      formData.value.city = user.city;
    }
  }
});
</script>



<template>
  <div>
    <form class="connexion_form px-3" @submit.prevent="handleSubmit">
      <div v-if="!props.profilPage" class="d-flex gender mb-3">
        <div class="form-group">
          <input class="radio_input btn-check" type="radio" name="sexe" id="Homme" @click="handleChangeCivility"
            value="Homme">
          <label class="ms-4 btn label" for="Homme">Homme</label>
        </div>
        <div class="form-group me-2">
          <input class="radio_input btn-check" type="radio" name="sexe" id="Femme" @click="handleChangeCivility"
            value="Femme">
          <label class="ms-4 btn label" for="Femme">Femme</label>
        </div>
      </div>
      <div :class="{ 'd-md-flex': !props.profilPage, 'justify-content-center': !props.profilPage }">
        <div class="form_part px-3" :class="{ 'w-50': !props.profilPage }">
          <div class="name">
            <div class="form-group">
              <label class="connexion_form_label ms-4" for="name">Nom</label>
              <input type="text" name="name" id="name" class="form-control input_login" placeholder="Nom"
                v-model="formData.lastName">
              <small class="ms-4" :class="{ 'd-none': !lastNameAlertVisible }" ref="lastNameAlert">Entrer votre
                nom</small>
            </div>
            <div class="form-group">
              <label class="connexion_form_label ms-4" for="firstname">Prénom</label>
              <input type="text" name="firstname" id="firstname" class="form-control input_login" placeholder="Prénom"
                v-model="formData.firstName">
              <small class="ms-4" :class="{ 'd-none': !firstNameAlertVisible }" ref="firstNameAlert">Entrer votre
                prénom</small>
            </div>
          </div>
          <div class="form-group">
            <label class="connexion_form_label ms-4" for="phone">Téléphone</label>
            <input type="tel" name="phone" id="phone" class="form-control input_login" placeholder="Numéro de téléphone"
              v-model="formData.phone">
            <small class="ms-4" :class="{ 'text-danger': !formData.phone, 'd-none': !phoneAlertVisible }"
              ref="phoneAlert">Veuillez entrer votre numéro de téléphone</small>
          </div>
          <div v-if="!props.profilPage" class="form-group">
            <label class="connexion_form_label ms-4" for="date">Date de naissance :</label>
            <input type="date" name="date" id="date" class="form-control input_login" placeholder="Date de naissance"
              v-model="formData.birthDate">
            <small class=" ms-4" :class="{ 'd-none': !birthDateAlertVisible }" ref="birthDateAlert">Veuillez entrer
              votre
              date de naissance</small>
          </div>
          <div class="d-md-flex">
            <div class="form-group">
              <label class="connexion_form_label ms-4" for="country">Pays</label>
              <input type="text" name="country" id="country" class="form-control input_login" placeholder="Pays"
                v-model="formData.country">
              <small class="ms-4" :class="{ 'd-none': !countryAlertVisible }" ref="countryAlert">Veuillez entrer votre
                pays</small>
            </div>
            <div class="form-group">
              <label class="connexion_form_label ms-4" for="city">Ville</label>
              <input type="text" name="city" id="city" class="form-control input_login" placeholder="ville"
                v-model="formData.city">
              <small class="ms-4" :class="{ 'd-none': !cityAlertVisible }" ref="cityAlert">Veuillez entrer votre
                ville</small>
            </div>
          </div>
        </div>
        <div class="form_part px-3" :class="{ 'w-50': !props.profilPage }">
          <div class="form-group w-100">
            <label class="connexion_form_label ms-4" for="address">Adresse</label>
            <input type="text" name="address" id="address" class="form-control input_login"
              placeholder="Adresse de maison" v-model="formData.address">
            <small class="ms-4" :class="{ 'd-none': !addressAlertVisible }" ref="addressAlert">Veuillez entrer votre
              adresse</small>
          </div>
          <div class="form-group">
            <label class="connexion_form_label ms-4" for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control input_login" placeholder="email"
              v-model="formData.email" :disabled="props.profilPage">
            <small class="ms-4" :class="{ 'd-none': !emailAlertVisible }" ref="emailAlert">Veuillez entrer votre
              email</small>
          </div>
          <div v-if="!props.profilPage" class="form-group">
            <label class="connexion_form_label ms-4" for="password">Mot de passe</label>
            <input type="password" name="password" id="password" class="form-control input_login"
              placeholder="Mot de passe" v-model="formData.password">
            <small class="ms-4" :class="{ 'd-none': !passwordAlertVisible }" ref="passwordAlert">Veuillez entrer votre
              mot
              de passe</small>
          </div>
          <div v-if="!props.profilPage" class="form-group">
            <label class="connexion_form_label ms-4" for="confirm_password">Confirmation de mot de passe</label>
            <input type="password" name="confirm_password" id="confirm_password" class="form-control input_login"
              placeholder="Confirmation de mot de passe" v-model="confirmPassword">
            <small class="ms-4" :class="{ 'd-none': !confirmPasswordAlert }" ref="confirmationAlert">Les mots de passe
              ne
              correspondent pas</small>
          </div>
        </div>
      </div>
      <div v-if="!props.profilPage" class="form-group text-center mt-4">
        <button class="btn btn-lg button_login mx-auto">ENREGISTRER</button>
      </div>
      <div v-if="props.profilPage" class="form-group text-center mt-4">
        <button class="btn btn-lg button_login mx-auto">Modifier</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.connexion_form {
  width: 100%;
}

small {
  color: red;
}

.form-control {
  color: white;
}

.form_part {
  height: 100%;
}

.form-group {
  padding: 0.5rem;
}

.gender {
  align-items: center;
  justify-content: center;
}

.name {
  display: flex;
  width: 100%;
}

.label {
  border: 2px solid black;
}

.label:hover {
  border-color: #B54A29;
}

input[type="radio"]:checked+label {
  background-color: #B54A29;
  color: white;
}

.gender-text {
  margin-bottom: 0;
}

.text-danger {
  opacity: 0;
}

.radio_input {
  cursor: pointer;
}

.form-control:focus {
  box-shadow: none;
  background-color: #989898;
  color: white;
}

.connexion_form_label {
  color: #B54A29;
  text-transform: uppercase;
}

.input_login {
  border-radius: 3rem;
  padding: 1rem;
  width: 100%;
  background-color: #989898;
}

.input_login::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.button_login {
  background-color: #B54A29;
  color: white;
  border-radius: 3rem;
}

.button_login:hover {
  background-color: #B54A29;
}

@media screen and (max-width:1200px) {
  .form_part {
    width: 100%;
    padding-top: 0;
  }
}
</style>
