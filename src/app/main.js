import Vue from "vue";
import router from "./router/router";
import App from "./components/App.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Main from "../app/App.vue";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
