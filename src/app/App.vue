<template>
  <div class="app">
    <div class="navbar navbar-light bg-light">
      <router-link to="/">Accueil</router-link>
      <router-link to="/signup">S'inscrire</router-link>
      <router-link to="/signin">Se connecter</router-link>
    </div>
    <router-view />
  </div>
</template>