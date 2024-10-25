import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useContactRequestStore = defineStore("contactRequest", () => {
    const all = ref([]);

    const $fetch = async () => {
        await axios.get("/api/contact/all/", {
            withCredentials: true
        }).then(({ data }) => {
            all.value = data;
        }).catch(error => {
            if (error.status === 401) {
                console.log("User is not authenticated");
            }
            console.log("Fail to fetch data from server");
        })
    }

    const unreadMessages = computed(() => {
        return all.value.filter(data => !data.checked);
    })

    const unreadMessagesCount = computed(() => {
        return unreadMessages.value.length
    })

    const $reset = () => {
        all.value = [];
    }

    return { all, unreadMessages, unreadMessagesCount, $fetch, $reset }
})