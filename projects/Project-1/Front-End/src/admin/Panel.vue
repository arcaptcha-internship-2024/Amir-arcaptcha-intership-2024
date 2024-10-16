<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PanelSidebar from './components/PanelSidebar.vue';
import MainContentTitle from './components/MainContentTitle.vue';
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

<style lang="css" scoped>
/* Main container */
.wrapper {
    display: flex;
    height: 100%;
}

/* Main content styling */
.main-content {
    flex-grow: 1;
    padding: 2rem;
    background-color: #f8f9fa;
    overflow-y: auto;
    transition: all 0.3s ease;
}

.main-content h1 {
    color: #343a40;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

/* Card styling for content */
.content-card {
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.4s ease-in-out;
}

.content-card.show {
    opacity: 1;
    transform: translateY(0);
}

/* Sidebar toggle button */
.sidebar-toggle {
    position: absolute;
    top: 15px;
    right: -40px;
    width: 40px;
    height: 40px;
    background-color: #343a40;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Hover effect for sidebar toggle */
.sidebar-toggle:hover {
    background-color: #495057;
}

/* Toggling the sidebar to a smaller version */
.collapsed {
    width: 80px;
}

.collapsed .logo {
    font-size: 1rem;
    padding: 0.5rem;
}

.collapsed ul li {
    padding: 0.75rem 1rem;
}

.collapsed ul li a {
    font-size: 0.85rem;
    padding-left: 0.5rem;
}

/* Expand the main content when sidebar is collapsed */
.expanded {
    padding-left: 90px;
}

/* Animation for content cards */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.content-card {
    animation: slideUp 0.5s ease-in-out;
}

/* Media query to handle responsiveness */
@media (max-width: 768px) {
    .sidebar {
        width: 60px;
    }

    .sidebar ul li a {
        font-size: 0.85rem;
        padding-left: 0.5rem;
    }

    .main-content {
        padding: 1rem;
    }
}
</style>