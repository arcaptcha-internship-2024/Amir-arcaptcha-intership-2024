import { createWebHistory, createRouter } from "vue-router";

import ContactUs from "@/pages/contactUs.vue";
import AdminLogin from "@/admin/Login.vue";
import AdminPanel from "@/admin/Panel.vue";

const routes = [
    { path: "/contactUs/", component: ContactUs, meta: { showHeader: true } },
    { path: "/admin/login/", component: AdminLogin, meta: { showHeader: false } },
    { path: "/admin/", component: AdminPanel, meta: { showHeader: false } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;