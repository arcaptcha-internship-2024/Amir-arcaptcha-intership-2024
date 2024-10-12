import { createWebHistory, createRouter } from "vue-router";

import contactUs from "@/pages/contactUs.vue";

const routes = [
    { path: "/contactUs", component: contactUs },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;