import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/signup",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/signin",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/app/:id",
    name: "App",
    component: () => import("../views/App.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  /* base: process.env.BASE_URL, */
  routes
})

export default router
