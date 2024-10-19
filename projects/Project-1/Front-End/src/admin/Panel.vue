<script setup>
import PanelSidebar from './components/PanelSidebar.vue';
import LoginRequired from "@/utils/admin/LoginRequired.vue";
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
