<script setup>
import "@/assets/admin/css/admin-panel.css";
import MainContentTitle from "./components/MainContentTitle.vue";
import PanelSidebar from "./components/PanelSidebar.vue";

</script>

<template>
    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <MainContentTitle title="Contact Requests" />
        </div>
    </div>
</template>
