<script setup>
import MainContentTitle from './MainContentTitle.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import "@/assets/admin/css/admin-panel.css"
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alerts';
import { useContactRequestStore } from '@/store/contactRequests';
import { useRouter } from 'vue-router';
import { logoutUser } from '@/utils/admin/authentication';
const contactRequests = ref([]);
const unreadRequets = ref([]);
const userStore = useUserStore();
const alertStore = useAlertStore();
const contactRequestStore = useContactRequestStore();
const router = useRouter();

const getContactRequests = async () => {
    await contactRequestStore.$fetch();
    contactRequests.value = contactRequestStore.all;
    unreadRequets.value = contactRequests.value.filter(request => request.checked === false);
}

onMounted(async () => {
    userStore.fetch();
    if (userStore.isUserAnonymous) {
        logoutUser();
        router.push({name: "adminLogin"})
    }
    alertStore.$fire();
    await getContactRequests();
})
</script>
<template>
    <MainContentTitle title="Dashboard" />
    <div class="row g-3">
        <div class="col-md-6">
            <div class="content-card bg-success text-light show">
                <h3>You have {{ contactRequestStore.unreadMessagesCount }} new requests</h3>
                <RouterLink :to="{ name: 'adminManageContactRequests', query: { filter: 'not-checked' } }"
                    class="btn btn-light">View in detail</RouterLink>
            </div>
        </div>
        <div class="col-md-6" v-if="userStore.adminRole === 'superuser'">
            <div class="content-card bg-secondary text-light show">
                <h3>Users Management</h3>
                <RouterLink :to="{ name: 'adminManageUsers' }" class="btn btn-light">
                    View in detail
                </RouterLink>
            </div>
        </div>
    </div>
</template>