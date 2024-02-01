<template>
  <form class="connexion_form px-3" action="">
    <div class="d-md-flex">
      <div class="form-group me-2">
        <label class="connexion_form_label ms-4" for="name">Nom</label>
        <input type="text" name="name" id="name" class="form-control input_login" placeholder="Nom">
      </div>
      <div class="form-group">
        <label class="connexion_form_label ms-4" for="firstname">Prénom</label>
        <input type="text" name="firstname" id="firstname" class="form-control input_login" placeholder="Prénom">
      </div>
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="phone">Numéro de téléphone</label>
      <input type="tel" name="phone" id="phone" class="form-control input_login" placeholder="Numéro de téléphone">
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control input_login" placeholder="email">
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="password">Mot de passe</label>
      <input type="password" name="password" id="password" class="form-control input_login" placeholder="Mot de passe">
    </div>
    <div class="form-group">
      <label class="connexion_form_label ms-4" for="confirm_password">Confirmation de mot de passe</label>
      <input type="password" name="cofirm_password" id="confirm_password" class="form-control input_login" placeholder="Confirmation de mot de passe">
    </div>
    <div class="form-group text-center mt-4">
      <button class="btn btn-lg button_login mx-auto">SE CONNECTER</button>
    </div>
  </form>
</template>

<style scoped>
.connexion_form{
  width: 100%;
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
  margin-bottom: 1rem;
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
