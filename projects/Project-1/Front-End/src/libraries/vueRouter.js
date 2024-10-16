import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue";
import ContactUs from "@/pages/contactUs.vue";
import AdminLogin from "@/admin/Login.vue";
import AdminPanel from "@/admin/Panel.vue";
import ManageContactRequests from "@/admin/ManageContactRequests.vue";
import AdminIndex from "@/admin/components/index.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/contactUs/", component: ContactUs },
    { path: "/admin/login/", component: AdminLogin, name: "adminLogin" },
    { 
        path: "/admin/", 
        component: AdminPanel,
        children: [
            { path: "", component: AdminIndex, name: "adminPanel" },
            { path: "contact-requests/", component: ManageContactRequests, name: "adminManageContactRequests" },
        ] 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;