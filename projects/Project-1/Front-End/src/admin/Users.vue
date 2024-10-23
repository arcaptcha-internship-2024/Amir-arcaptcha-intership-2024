<script setup>
import axios from 'axios';
import { logoutUser } from '@/utils/admin/authentication';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const users = ref([]);

const fetchUsers = () => {
    axios.get("/api/admin/all/", {
        withCredentials: true,
    }).then(({ data }) => {
        users.value = data;
    }).catch(error => {
        if (error.status === 401) {
            logoutUser();
            router.push({ name: "adminLogin" });
        }
        console.log(error);
    })
}
onMounted(() => {
    fetchUsers();
})
</script>

<template>
    <div class="row bg-secondary p-2 rounded text-white align-items-center my-1" v-for="user in users">
        <div class="col-1">{{ user.id }}</div>
        <div class="col-4">{{ user.username }}</div>
        <div class="col-2">
            <button class="btn btn-light">View</button>
        </div>
    </div>
</template>