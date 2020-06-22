<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container" style="max-width: 400px;">
      <form class="px-4 py-3" @submit.prevent="signin">
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
      seconnecter: new Seconnecter()
    };
  },
  methods: {
    signin() {
      fetch("/api/signin", {
        method: "POST",
        body: JSON.stringify(this.seconnecter),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => console.log(data));
      this.$router.push({ name: "Test" });
    }
  }
};
</script>