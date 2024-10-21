<script setup>
import { onMounted } from 'vue';
import { useAlertStore } from '@/store/alerts';
import PanelSidebar from './components/PanelSidebar.vue';
import LoginRequired from "@/utils/admin/LoginRequired.vue";
const alertStore = useAlertStore();

onMounted(() => {
    alertStore.$fire();
})
</script>

<template>
    <LoginRequired />
    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <RouterView />
        </div>
    </div>

</template>
