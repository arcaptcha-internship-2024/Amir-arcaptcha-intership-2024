import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const authToken = ref("");
    const isUserAuthenticated = computed(() => authToken.value !== "");
    const isUserAnonymous = computed(() => authToken.value === "");
    const $reset = () => {
        authToken.value = "";
    }
    const setAuthenticateUser = (token) => {
        authToken.value = token;
    }
    return { authToken, isUserAuthenticated, isUserAnonymous, $reset, setAuthenticateUser }
})