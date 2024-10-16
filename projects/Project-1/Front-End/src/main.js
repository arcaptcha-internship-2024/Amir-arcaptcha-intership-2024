import { createApp } from 'vue';
import App from './App.vue';
import router from './libraries/vueRouter';
import Vue3Toastify from 'vue3-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'vue3-toastify/dist/index.css';



createApp(App).use(router).use(Vue3Toastify, {
    autoClose: 2000,
}).mount('#app');
