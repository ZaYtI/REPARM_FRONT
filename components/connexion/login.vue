<script setup>
import { reactive , toRaw } from 'vue';
import { useAuthStore } from '@/stores/auth';
const router = useRouter();
async function handleLogin(event){
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  await useAuthStore().login(email, password);
  if (useAuthStore().isLoggedIn) {
    await useAuthStore().profile();
    router.push('/profile');
  }
}

onMounted(() => {
  if (useAuthStore().isLoggedIn) {
    router.push('/profile');
  }
});
</script>

<template>
  <form class="connexion_form px-4" @submit.prevent="handleLogin">
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control input_login text-white" placeholder="email">
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="password">Mot de passe</label>
      <input type="password" name="password" id="password" class="form-control input_login text-white" placeholder="Mot de passe">
    </div>
    <div class="form-group text-center mt-4">
      <button class="btn btn-lg button_login mx-auto" type="submit">SE CONNECTER</button>
    </div>
  </form>
</template>

<style scoped>
.connexion_form {
  width: 100%;
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
  margin-bottom: 1rem;
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
</style>
