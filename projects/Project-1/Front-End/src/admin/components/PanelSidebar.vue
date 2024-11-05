<script setup>
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
</script>
<template>
    <div class="sidebar">
        <div class="logo">Arcaptcha</div>
        <ul>
            <RouterLink :to="{ name: 'adminPanel' }" class="sidebar-link">
                <span>Dashboard</span>
            </RouterLink>
            <RouterLink :to="{ name: 'adminManageUsers' }" class="sidebar-link"
                v-if="userStore.adminRole === 'superuser'">
                <span>Users</span>
            </RouterLink>
            <RouterLink :to="{ name: 'adminManageContactRequests' }" class="sidebar-link">
                <span>Contact Requests</span>
            </RouterLink>
            <RouterLink :to="{ name: 'adminLogout' }" class="sidebar-link">
                <span>Logout</span>
            </RouterLink>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.sidebar {
    width: 250px;
    min-height: 100vh;
    background-color: #343a40;
    color: #fff;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
}

.sidebar .logo {
    text-align: center;
    padding: 1.5rem;
    font-size: 1.25rem;
    background-color: #212529;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-link {
    padding: 1rem 1.5rem;
    transition: background-color 0.3s ease;
    cursor: pointer;
    display: list-item;
    text-decoration: none
}

.sidebar-link:hover {
    background-color: #495057;
}

.sidebar-link span {
    text-decoration: none;
    color: #fff;
    display: block;
    font-size: 1rem;
    font-weight: 500;
}
</style>