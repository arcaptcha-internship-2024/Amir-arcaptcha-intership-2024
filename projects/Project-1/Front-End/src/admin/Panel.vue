<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PanelSidebar from './components/PanelSidebar.vue';
import MainContentTitle from './components/MainContentTitle.vue';
import "@/assets/admin/css/admin-panel.css"
const contactRequests = ref([]);
const unreadRequets = ref([]);
const router = useRouter();

const getContactRequests = async () => {
    await axios.get("http://localhost:8000/api/contact/all/", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(({ data }) => {
        contactRequests.value = data;
        unreadRequets.value = contactRequests.value.filter(request => request.checked === false);
    }).catch(error => {
        if (error.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Authentication Failed",
                text: "You're not allowed to access this page"
            })

        }
        router.push("/admin/login/");
    })
}

onMounted(async () => {
    if (!localStorage.getItem("token")) {
        Swal.fire({
            icon: "error",
            title: "Authentication Failed",
            text: "You're not allowed to access this page",
            timer: 2000
        })
    }
    await getContactRequests();
})
</script>

<template>

    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <MainContentTitle title="Dashboard" />
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="content-card bg-success text-light show">
                        <h3>You have {{ unreadRequets.length }} new requests</h3>
                        <RouterLink to="" class="btn btn-light">View in detail</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
