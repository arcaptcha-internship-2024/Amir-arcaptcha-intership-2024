import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { logoutUser } from "@/utils/admin/authentication";

export const useAdminStore = defineStore("admins", () => {
    const users = ref([]);
    const fetch = async () => {
        if (users.value.length > 0) return;
        await axios.get("/api/admin/all/", {
            withCredentials: true,
        }).then(({ data }) => {
            users.value = data;
        }).catch(error => {
            if (error.status === 401) {
                logoutUser();
            }
            console.log(error);
        })
    }
    const $reset = () => {
        users.value = [];
    }
    return { users, fetch, $reset }
})