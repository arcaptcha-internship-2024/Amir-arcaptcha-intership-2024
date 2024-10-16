<script setup>
import "@/assets/admin/css/admin-panel.css";
import MainContentTitle from "./components/MainContentTitle.vue";
import PanelSidebar from "./components/PanelSidebar.vue";
import ContactRequestRow from "./components/ContactRequestRow.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
const contactRequests = ref([]);

const getContactRequests = async () => {
    await axios.get("http://localhost:8000/api/contact/all/", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(({ data }) => {
        contactRequests.value = data;
    }).catch(error => {
        if (error.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Authentication Failed",
                text: "You're not allowed to access this page"
            })
        }
    })
}
onMounted(async () => {
    await getContactRequests();
})
</script>

<template>
    <div class="wrapper">
        <PanelSidebar />
        <div class="main-content">
            <MainContentTitle title="Contact Requests" />
            <div class="container">
                <ContactRequestRow 
                v-for="data in contactRequests"
                :number=1 
                :first_name=data.first_name 
                :last_name=data.last_name 
                date="2024/12/1" 
                :status=false
                />
            </div>
        </div>
    </div>
</template>
