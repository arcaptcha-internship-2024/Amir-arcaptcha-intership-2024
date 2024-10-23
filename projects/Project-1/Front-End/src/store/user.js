import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref({});
    const isUserAuthenticated = computed(() => user.value);
    const isUserAnonymous = computed(() => !user.value);
    const $reset = () => {
        user.value = {};
    }
    const setUserData = (userData) => {
        user.value = userData;
    }
    return { user, isUserAuthenticated, isUserAnonymous, $reset, setUserData }
})