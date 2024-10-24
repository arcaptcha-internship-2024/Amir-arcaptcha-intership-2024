<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import PanelSidebar from './components/PanelSidebar.vue';
const userStore = useUserStore();

onMounted(() => {
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
