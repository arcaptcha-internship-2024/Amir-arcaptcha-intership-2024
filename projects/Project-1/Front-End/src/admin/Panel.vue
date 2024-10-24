<script setup>
import { onMounted } from 'vue';
import { useAlertStore } from '@/store/alerts';
import { useUserStore } from '@/store/user';
import PanelSidebar from './components/PanelSidebar.vue';
const alertStore = useAlertStore();
const userStore = useUserStore();

onMounted(() => {
    alertStore.$fire();
    userStore.fetch();
})
</script>

<template>
    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <RouterView :key="$route.fullPath" />
        </div>
    </div>

</template>
