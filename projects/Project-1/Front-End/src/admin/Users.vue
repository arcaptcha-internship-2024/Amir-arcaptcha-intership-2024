<script setup>
import { useAdminStore } from '@/store/admins';
import { useUserStore } from '@/store/user';
import { onMounted, ref, computed } from 'vue';
import { useAlertStore } from '@/store/alerts';
import FilterAdmins from './components/FilterAdmins.vue';
import MainContentTitle from './components/MainContentTitle.vue';
const adminStore = useAdminStore();
const userStore = useUserStore();
const alertStore = useAlertStore();
const filterUsersRole = ref("all");
const filterUsersName = ref("");

const results = computed(() => {
    return adminStore.users.filter((user) => {
        const matchNames = filterUsersName.value === "" || user.username.toLowerCase().includes(filterUsersName.value.toLowerCase());
        const matchRole = filterUsersRole.value === "all" || user.role === filterUsersRole.value;
        return matchNames && matchRole;
    })
})

onMounted(async () => {
    await adminStore.fetch();
    alertStore.$fire();
})
</script>

<template>
    <MainContentTitle title="Admin Management" />
    <div class="container">
        <FilterAdmins @filterRole="value => filterUsersRole = value"
            @filterUsername="value => filterUsersName = value" />
        <div class="row bg-dark p-2 rounded text-white align-items-center my-1" v-for="(user, index) in results"
            :key="index">
            <div class="col-1">{{ index + 1 }}</div>
            <div class="col-4">{{ user.username }}</div>
            <div class="col-4">
                <button type="button" class="btn btn-primary" v-if="user.role === 'superuser'">Admin</button>
                <button type="button" class="btn btn-secondary" v-if="user.role === 'sale-manager'">Sale
                    Manager</button>
            </div>
            <div class="col-2">
                <button class="btn btn-light">View</button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <RouterLink v-if="userStore.adminRole === 'superuser'" :to="{ name: 'createAdminUser' }"
                    class="btn btn-success">Create new admin</RouterLink>
            </div>
        </div>
    </div>
</template>