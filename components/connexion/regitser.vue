<script setup>
  import { useAuthStore } from '@/stores/auth';
  const router = useRouter();
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

  let isFormValid = ref(true);

  function handleChangeCivility(event){
    formData.value.civility = event.target.value;
  }

  async function checkAllInput(){
    if(isFormValid.value === false){
      isFormValid.value = true;
    }
    if(formData.value.lastName === ''){
      document.getElementById('lastName-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('lastName-alert').style.opacity = 0;
    }
    if(formData.value.firstName === ''){
      document.getElementById('firstName-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('firstName-alert').style.opacity = 0;
    }
    if(formData.value.phone === ''){
      document.getElementById('phone-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('phone-alert').style.opacity = 0;
    }
    if(formData.value.birthDate === ''){
      document.getElementById('birthDate-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('birthDate-alert').style.opacity = 0;
    }
    if(formData.value.country === ''){
      document.getElementById('country-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('country-alert').style.opacity = 0;
    }
    if(formData.value.address === ''){
      document.getElementById('address-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('address-alert').style.opacity = 0;
    }
    if(formData.value.email === ''){
      document.getElementById('email-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('email-alert').style.opacity = 0;
    }
    if(formData.value.password === ''){
      document.getElementById('password-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('password-alert').style.opacity = 0;
    }
    if(confirmPassword.value === ''){
      document.getElementById('confirmation-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('confirmation-alert').style.opacity = 0;
    }
    if(formData.value.city === ''){
      document.getElementById('city-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('city-alert').style.opacity = 0;
    }
  }

  async function checkPassword(){
    if(formData.value.password !== confirmPassword.value || formData.value.password.length < 8){
      document.getElementById('confirmation-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('confirmation-alert').style.opacity = 0;
    }
  }

  async function isMajor(){
    let date = new Date();
    let year = date.getFullYear();
    let birthYear = formData.value.birthDate.split('-')[0];
    if(year - birthYear < 18){
      document.getElementById('birthDate-alert').innerText = 'Vous devez être majeur pour vous inscrire';
      document.getElementById('birthDate-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('birthDate-alert').style.opacity = 0;
    }
  }

  async function checkIsPhone(){
    let phone = formData.value.phone;
    if(phone.length !== 10){
      document.getElementById('phone-alert').innerText = 'Veuillez entrer un numéro de téléphone valide';
      document.getElementById('phone-alert').style.opacity = 1;
      isFormValid.value = false;
    }else{
      document.getElementById('phone-alert').style.opacity = 0;
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    await checkAllInput();
    await checkPassword();
    await isMajor();
    await checkIsPhone();
    if(isFormValid.value){
      await useAuthStore().register(formData.value);
      if (useAuthStore().getIsLoggedIn) {
      router.push('/profile');
      }
    }
  }

  onMounted(() => {
    if(useAuthStore().getIsLoggedIn){
      router.push('/profile');
    }
  })

</script>

<template>
  <form class="connexion_form px-3" @submit="handleSubmit">
    <div class="d-flex gender mb-3">
      <div class="form-group">
        <input class="radio_input btn-check" type="radio" name="sexe" id="Homme" @click="handleChangeCivility" value="Homme">
        <label class="ms-4 btn label" for="Homme">Homme</label>
      </div>
      <div class="form-group me-2">
        <input class="radio_input btn-check" type="radio" name="sexe" id="Femme" @click="handleChangeCivility" value="Femme">
        <label class="ms-4 btn label" for="Femme">Femme</label>
      </div>
    </div>
    <div class="d-md-flex">
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="name">Nom</label>
        <input type="text" name="name" id="name" class="form-control input_login" placeholder="Nom" v-model="formData.lastName">
        <small class="ms-4 text-danger" id="lastName-alert">Entrer votre nom</small>
      </div>
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="firstname">Prénom</label>
        <input type="text" name="firstname" id="firstname" class="form-control input_login" placeholder="Prénom" v-model="formData.firstName">
        <small class="ms-4 text-danger" id="firstName-alert">Entrer votre prénom</small>
      </div>
    </div>
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="phone">Téléphone</label>
        <input type="tel" name="phone" id="phone" class="form-control input_login" placeholder="Numéro de téléphone" v-model="formData.phone">
        <small class="ms-4 text-danger" id="phone-alert">Veuillez entrer votre numéro de téléphone</small>
      </div>
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="date">Date de naissance :</label>
        <input type="date" name="date" id="date" class="form-control input_login" placeholder="Date de naissance" v-model="formData.birthDate">
        <small class=" ms-4 text-danger" id="birthDate-alert">Veuillez entrer votre date de naissance</small>
      </div>
    <div class="d-md-flex">
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="country">Pays</label>
        <input type="text" name="country" id="country" class="form-control input_login" placeholder="Pays" v-model="formData.country">
        <small class=" ms-4 text-danger" id="country-alert">Veuillez entrer votre pays</small>
      </div>
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="city">Ville</label>
        <input type="text" name="city" id="city" class="form-control input_login" placeholder="ville" v-model="formData.city">
        <small class="ms-4 text-danger" id="city-alert">Veuillez entrer votre ville</small>
      </div>
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="address">Adresse</label>
      <input type="text" name="address" id="address" class="form-control input_login" placeholder="Adresse de maison" v-model="formData.address">
      <small class="ms-4 text-danger" id="address-alert">Veuillez entrer votre adresse</small>
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control input_login" placeholder="email" v-model="formData.email">
      <small class="ms-4 text-danger" id="email-alert">Veuillez entrer votre email</small>
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="password">Mot de passe</label>
      <input type="password" name="password" id="password" class="form-control input_login" placeholder="Mot de passe" v-model="formData.password">
      <div class="d-flex flex-column">
        <small class="ms-4 text-secondary">* 8 caractère minimum</small>
        <small class="ms-4 text-danger" id="password-alert">Veuillez entrer votre mot de passe</small>
      </div>
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="confirm_password">Confirmation de mot de passe</label>
      <input type="password" name="cofirm_password" id="confirm_password" class="form-control input_login" placeholder="Confirmation de mot de passe" v-model="confirmPassword">
      <small class="ms-4 text-danger" id="confirmation-alert">Les mots de passe ne corresponde pas</small>
    </div>
    <div class="form-group text-center mt-4">
      <button class="btn btn-lg button_login mx-auto">ENREGISTRER</button>
    </div>
  </form>
</template>

<style scoped>
.connexion_form{
  width: 100%;
}

.gender{
  align-items: center;
  justify-content: center;
}

.label{
  border: 2px solid black ; 
}

.label:hover{
  border-color: #B54A29;
}

input[type="radio"]:checked+label{
  background-color: #B54A29;
  color: white;
}

.gender-text{
  margin-bottom: 0;
}

.text-danger{
  opacity: 0;
}

.radio_input{
  cursor: pointer;
}

.form-control:focus{
  box-shadow: none;
  background-color: #989898;
  color: white;
}

.connexion_form_label{
  color: #B54A29;
  text-transform: uppercase;
}

.input_login{
  border-radius: 3rem;
  padding: 1rem;
  width: 100%;
  background-color: #989898;
}

.input_login::placeholder{
  color: rgba(255, 255, 255, 0.5);
}

.button_login {
  background-color: #B54A29;
  color: white;
  border-radius: 3rem;
}

.button_login:hover{
  background-color: #B54A29;
}
</style>
