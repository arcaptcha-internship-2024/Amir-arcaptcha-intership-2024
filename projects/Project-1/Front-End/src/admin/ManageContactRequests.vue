<script setup>
import MainContentTitle from "./components/MainContentTitle.vue";
import ContactRequestRow from "./components/ContactRequestRow.vue";
import FilterContactRequests from "./components/FilterContactRequests.vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useContactRequestStore } from "@/store/contactRequests";
import { logoutUser } from '@/utils/admin/authentication';
import "@/assets/admin/css/admin-panel.css";
const filteringResult = ref("all");
const searchQuery = ref("");
const router = useRouter();
const userStore = useUserStore();
const contactRequestStore = useContactRequestStore();

const isNameIncludeQuery = (first_name, last_name, query) => {
    let name = first_name.toLowerCase() + " " + last_name.toLowerCase();
    return name.includes(query.toLowerCase());
}

const displayedResults = computed(() => {
    return contactRequestStore.all.filter(data => {
        let status = true;
        if (filteringResult.value !== "all") {
            status = data.status === filteringResult.value;
        }
        let searchFilter = isNameIncludeQuery(data.first_name, data.last_name, searchQuery.value);
        return status && searchFilter;
    })
})

onMounted(async () => {
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
        <FilterContactRequests @filter-by="query => filteringResult = query" @searchBy="query => searchQuery = query" />
        <ContactRequestRow v-for="(data, index) in displayedResults" :number="index + 1" :first_name=data.first_name
            :last_name=data.last_name :created_at=data.created_at :status=data.status :key="index" :id=data.id
            v-if="displayedResults.length" />
        <h2 v-else>No result for display</h2>
    </div>
</template>
