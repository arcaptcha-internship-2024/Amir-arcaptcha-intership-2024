<script setup>
import { ref } from "vue";
const isAuthenticatedUser = ref(false);
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <!-- Logo -->
            <a class="navbar-brand" href="#">Arcaptcha</a>

            <!-- Navbar toggler for mobile view -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Middle navigation buttons -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/contactUs/" class="nav-link">Contact Us</RouterLink>
                    </li>
                </ul>

                <!-- Login and Sign-up buttons -->
                <div class="auth-buttons">
                    <a href="#" class="btn btn-outline-primary">Login</a>
                    <a href="#" class="btn btn-primary">Sign Up</a>
                </div>
            </div>
        </div>
    </nav>

</template>

<style lang="css" scoped>
.navbar {
    background-color: #f8f9fa;
    padding: 1rem;
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.navbar-nav {
    margin: 0 auto;
}

.nav-item .nav-link {
    position: relative;
    color: #333;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    transition: color 0.3s ease;
}

.nav-item .nav-link::before {
    content: '';
    position: absolute;
    width: 0%;
    height: 3px;
    bottom: -5px;
    left: 0;
    background-color: #007bff;
    transition: width 0.3s ease;
}

.nav-item .nav-link:hover::before {
    width: 100%;
}

.nav-item .nav-link:hover {
    color: #007bff;
}

.auth-buttons .btn {
    margin-left: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.auth-buttons .btn:hover {
    background-color: #007bff;
    color: #fff;
}

/* Logo hover effect */
.navbar-brand:hover {
    color: #007bff;
    transition: color 0.3s ease;
}
</style>