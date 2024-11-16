<script setup>
import MainContentTitle from './MainContentTitle.vue';
import { onMounted, ref } from 'vue';
import "@/assets/admin/css/admin-panel.css"
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alerts';
import { useContactRequestStore } from '@/store/contactRequests';
import { useRouter } from 'vue-router';
import { logoutUser } from '@/utils/admin/authentication';
import axios from "axios";
const userStore = useUserStore();
const alertStore = useAlertStore();
const contactRequestStore = useContactRequestStore();
const router = useRouter();
const actionLogs = ref([]);

const getContactRequests = async () => {
    await contactRequestStore.$fetch();
}

const getLogs = async () => {
    axios.get("http://localhost:8000/api/admin/logs/", { withCredentials: true })
        .then(({ data }) => {
            actionLogs.value = data;
        })
        .catch(error => {
            alertStore.setMessage("Failed to load admin actions", "error")
            alertStore.$fire()
        })
}

onMounted(async () => {
    userStore.fetch();
    if (userStore.isUserAnonymous || userStore.user == {}) {
        logoutUser();
        router.push({ name: "adminLogin" })
    }
    alertStore.$fire();
    await getContactRequests();
    await getLogs();
})
</script>
<template>
    <MainContentTitle title="Dashboard" />
    <div class="row g-3">
        <div class="col-md-6">
            <div class="content-card bg-success text-light show">
                <h3>You have {{ contactRequestStore.notCheckedMessagesCount }} new requests</h3>
                <RouterLink :to="{ name: 'adminManageContactRequests' }" class="btn btn-light">View in detail
                </RouterLink>
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
        <div class="p-2 rounded rounded-2 bg-dark text-light d-flex flex-column w-100">
            <h3 class="my-2">Admin Actions:</h3>
            <div class="bg-secondary p-2 my-1 w-100 rounded-2" v-for="action in actionLogs">
                {{ action.date }}:
                <span class="fw-bold">
                    {{ action.message }}
                </span>
            </div>
        </div>
    </div>
</template>