import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { logoutUser } from "@/utils/admin/authentication";

export const useUserStore = defineStore("user", () => {
    const user = ref({});
    const isUserAuthenticated = computed(() => !isUserObjEmpty());
    const isUserAnonymous = computed(() => isUserObjEmpty());
    const isUserObjEmpty = () => {
        if (Object.keys(user.value).length === 0) {
            return true;
        }
        return false;
    }
    const logout = async () => {
        await axios.get("http://localhost:8000/api/admin/logout/", { withCredentials: true })
            .then(response => {
                user.value = {};
                logoutUser();
            })
            .catch(error => {
                console.log("Failed to logout user");
            })
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

    return { user, isUserAuthenticated, isUserAnonymous, adminRole, logout, setUserData, fetch }
})