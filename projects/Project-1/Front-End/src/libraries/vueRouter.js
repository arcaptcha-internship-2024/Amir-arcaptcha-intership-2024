import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue";
import ContactUs from "@/pages/contactUs.vue";
import AdminLogin from "@/admin/Login.vue";
import AdminPanel from "@/admin/Panel.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/contactUs/", component: ContactUs },
    { path: "/admin/login/", component: AdminLogin, name: "adminLogin" },
    { path: "/admin/", component: AdminPanel },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;