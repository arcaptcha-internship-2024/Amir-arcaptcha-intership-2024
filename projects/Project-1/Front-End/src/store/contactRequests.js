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

    return { all, notCheckedMessages, notCheckedMessagesCount, inProgressMessages, completedMessages, $fetch, $reset }
})