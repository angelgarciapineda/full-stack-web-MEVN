<template>
  <div>
    <div>
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand :to="{name:'Home'}">Accueil</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template v-slot:default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{name:'Login'}">Se connecter</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container" style="max-width: 400px;">
      <form @submit.prevent="signup" class="px-4 py-3" autocomplete="off">
        <div class="form-group">
          <label for="exampleInputNom">Nom</label>
          <input
            type="text"
            v-model="sinscrire.displayName"
            class="form-control"
            id="exampleInputNom"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            v-model="sinscrire.email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email@example.com"
          />
          <small
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Mot de passe</label>
          <input
            type="password"
            v-model="sinscrire.password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <p style="color:red">{{message}}</p>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script>
class Sinscrire {
  constructor(displayName, email, password) {
    this.displayName = displayName;
    this.email = email;
    this.password = password;
  }
}
export default {
  name: "Register",
  data() {
    return {
      sinscrire: new Sinscrire(),
      _user: "",
      message: ""
    };
  },
  methods: {
    signup() {
      this.axios
        .post("/signup", this.sinscrire)
        .then(res => {
          console.log(res.data);
          this.$router.push({ name: "Login" });
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  }
};
</script>

<style scoped>
</style>