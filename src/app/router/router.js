import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)
export default new Router({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[
        {
            path:"/",
            name:"home",
            component:()=>import("../views/Home.vue")
        },
        {
            path:"/signup",
            name:"Register",
            component:()=>import("../views/Register.vue")
        },
        {
            path:"/signin",
            name:"Login",
            component:()=>import("../views/Login.vue")
        },
        {
            path:"/test",
            name:"Test",
            component:()=>import("../views/Test.vue")
        }
    ]
})