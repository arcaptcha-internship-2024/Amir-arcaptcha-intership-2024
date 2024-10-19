<script setup>
import MainContentTitle from './MainContentTitle.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import "@/assets/admin/css/admin-panel.css"
import { useUserStore } from '@/store/user';
const contactRequests = ref([]);
const unreadRequets = ref([]);
const userStore = useUserStore();

const getContactRequests = async () => {
    await axios.get("http://localhost:8000/api/contact/all/", {
        headers: {
            Authorization: "Bearer " + userStore.authToken
        }
    }).then(({ data }) => {
        contactRequests.value = data;
        unreadRequets.value = contactRequests.value.filter(request => request.checked === false);
    }).catch(error => {
        console.log("User is not authenticated");
    })
}

onMounted(async () => {
    await getContactRequests();
})
</script>
<template>
    <MainContentTitle title="Dashboard" />
    <div class="row g-3">
        <div class="col-md-6">
            <div class="content-card bg-success text-light show">
                <h3>You have {{ unreadRequets.length }} new requests</h3>
                <RouterLink to="" class="btn btn-light">View in detail</RouterLink>
            </div>
        </div>
    </div>
</template>