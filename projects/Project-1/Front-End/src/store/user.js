import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const authToken = ref("");
    const isUserAuthenticated = computed(() => authToken !== "");
    const $reset = () => {
        authToken.value = "";
    }
    return { authToken, isUserAuthenticated, $reset }
})