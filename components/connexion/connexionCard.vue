<script setup>
const connexionCardProps = defineProps({
  title: {
    type: String,
    required: true
  },
  pages: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="connexion_card mx-4"
    :class="{ 'login': connexionCardProps.pages === 'login', 'register': connexionCardProps.pages === 'register' }">
    <h3 class="account_title">{{ connexionCardProps.title }}</h3>
    <div class="component_container mb-3 mx-auto">
      <ConnexionLogin v-if="connexionCardProps.pages === 'login'" />
      <ConnexionRegitser v-if="connexionCardProps.pages === 'register'" />
    </div>
  </div>
</template>


<style>
.account_title {
  color: #3A483B;
  text-shadow: 0px 5px 5px grey;
}

.connexion_card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  border-radius: 3rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.login {
  max-width: 400px;
}

.register {
  max-width: 1000px;
}

.component_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
