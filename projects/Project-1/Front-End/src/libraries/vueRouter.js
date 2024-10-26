import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue";
import ContactUs from "@/pages/contactUs.vue";
import AdminLogin from "@/admin/Login.vue";
import AdminPanel from "@/admin/Panel.vue";
import ManageContactRequests from "@/admin/ManageContactRequests.vue";
import Users from "@/admin/Users.vue";
import CreateAdmin from "@/admin/CreateAdmin.vue";
import AdminIndex from "@/admin/components/index.vue";
import Logout from "@/admin/components/Logout.vue";
import ContactRequestDetail from "@/admin/ContactRequestDetail.vue";
import CreateContactRequestObject from "@/admin/CreateContactRequestObject.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/contactUs/", component: ContactUs },
    { path: "/admin/login/", component: AdminLogin, name: "adminLogin" },
    {
        path: "/admin/",
        component: AdminPanel,
        children: [
            { path: "", component: AdminIndex, name: "adminPanel" },
            { path: "users/", component: Users, name: "adminManageUsers" },
            { path: "users/create/", component: CreateAdmin, name: "createAdminUser" },
            { path: "contact-requests/", component: ManageContactRequests, name: "adminManageContactRequests" },
            { path: "contact-requests/create/", component: CreateContactRequestObject, name: "adminCreateContactRequests" },
            { path: "contact-requests/:id/", component: ContactRequestDetail, name: "contactRequestDetail" },
            { path: "logout/", component: Logout, name: "adminLogout" },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;