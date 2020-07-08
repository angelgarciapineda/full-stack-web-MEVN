<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark" disable="true" >
      <b-navbar-brand :to="{name:'Home'}">Accueil</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/signin'">Se connecter</b-nav-item>
          <b-nav-item :to="{name:'Register'}">S'inscrire</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>