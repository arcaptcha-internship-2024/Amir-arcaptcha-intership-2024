<script setup>
import MainContentTitle from "./components/MainContentTitle.vue";
import ContactRequestRow from "./components/ContactRequestRow.vue";
import FilterContactRequests from "./components/FilterContactRequests.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import "@/assets/admin/css/admin-panel.css";
const contactRequests = ref([]);
const displayedResults = ref([]);
const orderingResult = ref("");
const filteringResult = ref("");
const router = useRouter();
const route = useRoute;

const getContactRequests = async () => {
    await axios.get("http://localhost:8000/api/contact/all/", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then(({ data }) => {
        contactRequests.value = data;
        displayedResults.value = data;
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
const changeData = (query, queryKey) => {
    const queryObj = {};
    queryObj[queryKey] = query;
    router.push({
        path: route.path,
        query: queryObj
    })
}
const changeOrdering = (query) => {
    orderingResult.value = query;
    changeData(query, "ordering");
}
const changeFiltering = (query) => {
    filteringResult.value = query;
    changeData(query, "filter");
    if (query === "checked") {
        displayedResults.value = contactRequests.value.filter(data => data.checked)
    } else if (query === "not-checked") {
        displayedResults.value = contactRequests.value.filter(data => !data.checked)
    } else {
        displayedResults.value = contactRequests.value;
    }
}
</script>

<template>
    <MainContentTitle title="Contact Requests" />
    <div class="container">
        <FilterContactRequests @order-by="changeOrdering" @filter-by="changeFiltering" />
        <ContactRequestRow v-for="(data, index) in displayedResults" :number="index + 1" :first_name=data.first_name
            :last_name=data.last_name date="2024/12/1" :status=data.checked :key="index"
            v-if="displayedResults.length" />
        <h2 v-else>No result for display</h2>
    </div>
</template>
