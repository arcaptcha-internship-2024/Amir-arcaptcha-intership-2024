import { createWebHistory, createRouter } from "vue-router";

import ContactUs from "@/pages/contactUs.vue";
import AdminLogin from "@/admin/Login.vue"

const routes = [
    { path: "/contactUs", component: ContactUs },
    { path: "/admin/login", component: AdminLogin },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;