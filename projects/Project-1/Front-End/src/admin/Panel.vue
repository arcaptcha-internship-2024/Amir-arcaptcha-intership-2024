<script setup>
import { onMounted } from 'vue';
import { useAlertStore } from '@/store/alerts';
import PanelSidebar from './components/PanelSidebar.vue';
const alertStore = useAlertStore();

onMounted(() => {
    alertStore.$fire();
})
</script>

<template>
    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <RouterView :key="$route.fullPath"/>
        </div>
    </div>

</template>
