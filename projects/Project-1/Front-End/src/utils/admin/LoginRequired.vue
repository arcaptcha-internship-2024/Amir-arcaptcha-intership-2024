<script setup>
import { useAlertStore } from '@/store/alerts';
import { useUserStore } from '@/store/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const alertStore = useAlertStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
    if (userStore.isUserAnonymous) {
        router.push({ name: "adminLogin" })
        alertStore.setMessage("Please confirm authntication first", "warning");
    }
})
</script>
<template></template>