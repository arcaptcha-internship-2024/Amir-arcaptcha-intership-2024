import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue";
import ContactUs from "@/pages/contactUs.vue";
import AdminLogin from "@/admin/Login.vue";
import AdminPanel from "@/admin/Panel.vue";
import ManageContactRequests from "@/admin/ManageContactRequests.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/contactUs/", component: ContactUs },
    { path: "/admin/login/", component: AdminLogin, name: "adminLogin" },
    { path: "/admin/contact-requests/", component: ManageContactRequests, name: "adminManageContactRequests" },
    { path: "/admin/", component: AdminPanel, name: "adminPanel" },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;