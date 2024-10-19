import { createApp } from 'vue';
import App from './App.vue';
import router from './libraries/vueRouter';
import Vue3Toastify from 'vue3-toastify';
import { createPinia } from 'pinia';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router)
app.use(Vue3Toastify, { autoClose: 2000 });
app.use(pinia);
app.mount('#app');
