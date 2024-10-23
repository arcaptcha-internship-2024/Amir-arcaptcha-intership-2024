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
    return { user, isUserAuthenticated, isUserAnonymous, $reset, setUserData }
})