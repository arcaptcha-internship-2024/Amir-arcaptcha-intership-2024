<script setup>
import PanelSidebar from './components/PanelSidebar.vue';
</script>

<template>

    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <RouterView />
        </div>
    </div>

</template>
