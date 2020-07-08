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
            <b-nav-item :to="{name:'Register'}">S'inscrire</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container" style="max-width: 400px;">
      <form class="px-4 py-3" @submit.prevent="signin" autocomplete="off">
        <div class="form-group">
          <label for="exampleDropdownFormEmail2">Email address</label>
          <input
            v-model="seconnecter.email"
            type="email"
            class="form-control"
            id="exampleDropdownFormEmail2"
            placeholder="email@example.com"
          />
        </div>
        <div class="form-group">
          <label for="exampleDropdownFormPassword2">Password</label>
          <input
            v-model="seconnecter.password"
            type="password"
            class="form-control"
            id="exampleDropdownFormPassword2"
            placeholder="Password"
          />
        </div>
        <p style="color:red">{{message}}</p>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
class Seconnecter {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
export default {
  name: "Login",
  data() {
    return {
      seconnecter: new Seconnecter(),
      message: ""
    };
  },
  methods: {
    signin() {
      this.axios
        .post("/signin", this.seconnecter)
        .then(res => {
          const id = res.data.iduser;
          this.$router.push({ path: `/app/${id}` });
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  }
};
</script>