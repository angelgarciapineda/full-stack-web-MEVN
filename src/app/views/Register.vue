<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container" style="max-width: 400px;">
      <form @submit.prevent="signup" class="px-4 py-3">
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
          />
        </div>
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
      _user: ""
    };
  },
  methods: {
    signup() {
      fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(this.sinscrire),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this._user = data;
          console.log(this._user);
        });
      this.sinscrire = new Sinscrire();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
</style>