<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import getCaptchaToken from "/src/utils/captcha/main";

const username = ref("");
const password = ref("");
const captchaToken = ref("");
const successLoginMessageAlert = () => {
    Swal.fire({
        title: "Welcome",
        text: "You have loggin successfully",
        icon: "success",
        timer: 2000,
        showCloseButton: false
    })
}

const errorLoginMessageAlert = () => {
    Swal.fire({
        title: "Error",
        text: "Failed to login user",
        icon: "error",
        timer: 2000,
        showCloseButton: false
    })
}

const captchaRequiredMessageAlert = () => {
    Swal.fire({
        title: "Error",
        text: "Please solve the captcha question",
        icon: "error",
        timer: 2000,
        showCloseButton: false
    })
}

const clearFormFields = () => {
    username.value = "";
    password.value = "";
}

const formSubmitHandler = async () => {
    captchaToken.value = getCaptchaToken();
    if (!captchaToken.value) {
        captchaRequiredMessageAlert();
        return;
    }
    const formData = { username: username.value, password: password.value, arcaptcha_token: captchaToken.value };
    try {
        const { data } = await axios.post("http://localhost:8000/api/admin/login/", formData);
        const { token } = data;
        localStorage.setItem("token", token);
        successLoginMessageAlert();
    } catch {
        errorLoginMessageAlert();
    }
    clearFormFields();
}
</script>

<template>
    <div class="login-container mx-auto my-5 show">
        <h2 class="text-center mb-4" style="color: #667eea;">Login</h2>
        <form @submit.prevent="formSubmitHandler">
            <div class="form-floating mb-4">
                <input type="text" class="form-control" id="username" placeholder="Username" required
                    v-model="username">
                <label for="username">Username</label>
            </div>
            <div class="form-floating mb-4">
                <input type="password" class="form-control" id="password" placeholder="Password" required
                    v-model="password">
                <label for="password">Password</label>
            </div>
            <div class="arcaptcha" data-site-key="rvr5q8ovqn"></div>
            <div class="text-center">
                <button type="submit" class="btn btn-custom">Log In</button>
            </div>
        </form>
    </div>

</template>

<style lang="css" scoped>
.login-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: scale(0.9);
    transition: all 0.4s ease-in-out;
    opacity: 0;
    max-width: 768px;
}

.login-container.show {
    opacity: 1;
    transform: scale(1);
}

/* Button hover effect */
.btn-custom {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    border-radius: 5rem;
}

.btn-custom:hover {
    color: #fff;
    background-color: #5762d5;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* Card slide-in animation */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(100px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom fade-in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}


.login-container {
    animation: slideIn 0.5s ease-out;
}
</style>