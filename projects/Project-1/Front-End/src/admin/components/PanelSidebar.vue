<template>
    <div class="sidebar">
        <div class="logo">Arcaptcha</div>
        <ul>
            <li>
                <RouterLink :to="{ name: 'adminPanel' }">Dashboard</RouterLink>
            </li>
            <li>
                <RouterLink :to="{ name: 'adminManageContactRequests' }">Contact Requests</RouterLink>
            </li>
            <li>
                <RouterLink to="#">Logout</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.sidebar {
    width: 250px;
    height: 100vh;
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

.sidebar ul li {
    padding: 1rem 1.5rem;
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.sidebar ul li:hover {
    background-color: #495057;
}

.sidebar ul li a {
    text-decoration: none;
    color: #fff;
    display: block;
    font-size: 1rem;
    font-weight: 500;
}
</style>