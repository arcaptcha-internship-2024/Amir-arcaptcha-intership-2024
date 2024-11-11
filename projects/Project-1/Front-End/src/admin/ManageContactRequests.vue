<script setup>
import MainContentTitle from "./components/MainContentTitle.vue";
import ContactRequestRow from "./components/ContactRequestRow.vue";
import FilterContactRequests from "./components/FilterContactRequests.vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useContactRequestStore } from "@/store/contactRequests";
import { useAlertStore } from '@/store/alerts';
import { logoutUser } from '@/utils/admin/authentication';
import Pagination from "./components/Pagination.vue";
import "@/assets/admin/css/admin-panel.css";
const filteringResult = ref("");
const searchQuery = ref("");
const router = useRouter();
const userStore = useUserStore();
const alertStore = useAlertStore();
const contactRequestStore = useContactRequestStore();
const paginationData = computed(() => { return contactRequestStore.pagination });


const isNameIncludeQuery = (first_name, last_name, phone_number, query) => {
    let name = first_name.toLowerCase() + " " + last_name.toLowerCase();
    return name.includes(query.toLowerCase()) || phone_number.includes(query);
}

const displayedResults = computed(() => {
    return contactRequestStore.all
})

const filterResultsBySearchQuery = async (query) => {
    await contactRequestStore.$fetch(1, 5, query, filteringResult.value);
    searchQuery.value = query;
}

const changePageHandler = async (pageIndex) => {
    await contactRequestStore.$fetch(pageIndex, 5, searchQuery.value, filteringResult.value);
}

const filterResultsByStatus = async (status) => {
    await contactRequestStore.$fetch(1, 5, searchQuery.value, status);
    filteringResult.value = status;
}

onMounted(async () => {
    alertStore.$fire();
    userStore.fetch();
    if (userStore.isUserAnonymous) {
        logoutUser();
        router.push({ name: "adminLogin" });
    }
    await contactRequestStore.$fetch();
})

</script>

<template>
    <MainContentTitle title="Contact Requests" />
    <div class="container">
        <FilterContactRequests @filter-by="filterResultsByStatus" @searchBy="filterResultsBySearchQuery" />
        <ContactRequestRow v-for="(data, index) in displayedResults" :number="index + 1" :first_name=data.first_name
            :last_name=data.last_name :phone_number=data.phone_number :status=data.status :key="index" :id=data.id
            v-if="displayedResults.length" />
        <h2 v-else>No result for display</h2>
        <div class="row my-2" v-if="displayedResults.length > 0">
            <div class="col-12 d-flex justify-content-center">
                <Pagination :pagination_data="paginationData" @next_page="changePageHandler"
                    @previous_page="changePageHandler" />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <RouterLink class="btn btn-success" :to="{ name: 'adminCreateContactRequests' }">
                    Create new one
                </RouterLink>
            </div>
        </div>
    </div>
</template>
