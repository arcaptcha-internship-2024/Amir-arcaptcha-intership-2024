import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { logoutUser } from "@/utils/admin/authentication";

export const useContactRequestStore = defineStore("contactRequest", () => {
    const all = ref([]);
    const pagination = ref({});

    const $fetch = async (page = 1, limit = 5, query="ali") => {
        await axios.get(`http://localhost:8000/api/contact/all/?page=${page}&limit=${limit}&q=${query}`, {
            withCredentials: true
        }).then(({ data }) => {
            const { contact_requests, next, previous } = data;
            all.value = contact_requests;
            pagination.value = {
                next,
                previous
            }
        }).catch(error => {
            if (error.status === 401) {
                console.log("User is not authenticated");
                logoutUser();
            }
            console.log("Fail to fetch data from server");
        })
    }

    const notCheckedMessages = computed(() => {
        return all.value.filter(data => data.status === "not-checked");
    })

    const notCheckedMessagesCount = computed(() => {
        return notCheckedMessages.value.length
    })

    const inProgressMessages = computed(() => {
        return all.value.filter(data => data.status === "in-progress")
    })

    const completedMessages = computed(() => {
        return all.value.filter(data => data.status === "completed")
    })

    const $reset = () => {
        all.value = [];
    }

    const exists = (id) => {
        return all.value.some(data => data.id === id);
    }

    const get = (id) => {
        return all.value.find(data => data.id === id);
    }

    const create = async (contactRequestData) => {
        let status = false, id = "", errorMessage = "";
        await axios.post("http://localhost:8000/api/contact/admin/create/", contactRequestData, { withCredentials: true })
            .then(({ data }) => {
                id = data.id;
                status = true;
            })
            .catch(error => {
                errorMessage = error.response.data.error;
                console.log("Fail to create object");
            })
        return { status, id, errorMessage }
    }
    const deleteObject = async (id) => {
        let success = false, message = "";
        await axios.delete(`http://localhost:8000/api/contact/admin/delete/${id}/`, { withCredentials: true })
            .then(({ data }) => {
                success = true;
                message = data.message;
            })
            .catch(error => {
                message = error.response.data.message
            });
        return { message, success }
    }
    const updateObject = async (data) => {
        let success = false, message = "";
        await axios.put(`http://localhost:8000/api/contact/admin/update/`, data, { withCredentials: true })
            .then(({ data }) => {
                success = true;
                message = data.message;
            })
            .catch(error => {
                message = error.response.data.message
            });
        return { success, message };
    }
    return { all, notCheckedMessages, notCheckedMessagesCount, inProgressMessages, completedMessages, pagination, $fetch, $reset, exists, get, create, deleteObject, updateObject }
})