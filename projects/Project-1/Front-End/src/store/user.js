import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref({});
    const isUserAuthenticated = computed(() => isUserObjEmpty());
    const isUserAnonymous = computed(() => !isUserObjEmpty());
    const isUserObjEmpty = () => {
        if (Object.keys(user.value).length > 0) {
            return true;
        }
        return false;
    }
    const $reset = () => {
        user.value = {};
    }
    const setUserData = (userData) => {
        user.value = userData;
    }
    const fetch = () => {
        try {
            user.value = JSON.parse(localStorage.getItem("user"));
        } catch {
            user.value = {};
        }
    }
    const adminRole = computed(() => {
        if (Object.keys(user.value).includes("role")) {
            return user.value.role;
        }
        return "";
    })

    return { user, isUserAuthenticated, isUserAnonymous, adminRole, $reset, setUserData, fetch }
})