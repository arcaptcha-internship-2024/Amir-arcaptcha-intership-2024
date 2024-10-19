<script setup>
import PanelSidebar from './components/PanelSidebar.vue';
import { redirectAnonymousUserToLoginRoute } from "@/utils/admin/authentication.js"
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/store/alerts';
const router = useRouter();
const alertStore = useAlertStore();

onMounted(() => {
    redirectAnonymousUserToLoginRoute(router);
    alertStore.$fire();
})
</script>

<template>

    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <RouterView />
        </div>
    </div>

</template>
