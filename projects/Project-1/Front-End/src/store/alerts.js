import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";

export const useAlertStore = defineStore("alerts", () => {
    const message = ref("");
    const level = ref("");
    const hasMessage = computed(() => message.value !== "");
    function setMessage(newMessage, messageLevel) {
        message.value = newMessage;
        switch (messageLevel) {
            case "success":
                level.value = "success";
                break;
            case "error":
                level.value = "error"
                break;
            case "warning":
                level.value = "warning"
                break;
            default:
                level.value = "info"
        }
    }
    function $reset() {
        message.value = "";
        level.value = "";
    }
    function $fire() {
        if (!message.value) return;
        const toastConfig = {
            theme: "dark",
            position: "top-left",
            type: level.value
        }
        toast(message.value, toastConfig);
        $reset();
    }
    return { message, level, hasMessage, setMessage, $reset, $fire };
})