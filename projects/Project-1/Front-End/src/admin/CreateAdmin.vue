<script setup>
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alerts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainContentTitle from './components/MainContentTitle.vue';
import { renderArcaptcha } from "@/utils/captcha/main";
const userStore = useUserStore();
const alertStore = useAlertStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const role = ref("");

onMounted(() => {
    userStore.fetch();
    if (userStore.adminRole !== "superuser") {
        alertStore.setMessage("You're not allowed to access this page", 'warning')
        router.push({ name: "adminPanel" });
    }
    renderArcaptcha();
})
</script>

<template>
    <MainContentTitle title="Create new admin" />
    <div class="container">
        <div class="row">
            <form class="col-12 col-md-8 p-3 rounded bg-dark" id="form-data" @submit.prevent="">
                <div class="form-floating my-2">
                    <input type="text" class="form-control" name="username" id="username" placeholder="Username"
                        v-model="username">
                    <label for="username">Username</label>
                </div>
                <div class="form-floating my-2">
                    <input type="password" class="form-control" name="password" id="password" placeholder="Password"
                        v-model="password">
                    <label for="password">Password</label>
                </div>
                <div class="my-2">
                    <select class="form-select" v-model="role">
                        <option disabled value="">Select Role</option>
                        <option value="superuser">Super user</option>
                        <option value="sale-manager">Sale Maneger</option>
                    </select>
                </div>
                <div id="arcaptcha" class="my-2"></div>
                <button class="btn btn-outline-light">Create</button>
            </form>
        </div>
    </div>
</template>