<script setup>
import PanelSidebar from './components/PanelSidebar.vue';
import { redirectAnonymousUserToLoginRoute } from "@/utils/admin/authentication.js"
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
    redirectAnonymousUserToLoginRoute(router);
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
