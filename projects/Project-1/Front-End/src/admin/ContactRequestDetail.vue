<script setup>
import { useContactRequestStore } from '@/store/contactRequests';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainContentTitle from './components/MainContentTitle.vue';
import ContactRequestInput from './components/ContactRequestInput.vue';
import ContactRequestTextArea from './components/ContactRequestTextArea.vue';
import ContactRequestStatus from './components/ContactRequestStatus.vue';
import { useAlertStore } from '@/store/alerts';
const alertStore = useAlertStore();
const contactRequestStore = useContactRequestStore();
const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const contactRequest = ref({});

const redirectIfObjectDoesntExists = () => {
    if (!contactRequestStore.exists(id.value)) {
        router.push({ name: 'adminManageContactRequests' })
    }
}

const getOwnerName = () => {
    return contactRequest.value.first_name + " " + contactRequest.value.last_name;
}

const deleteObjectHandler = async () => {
    const { success, message } = await contactRequestStore.deleteObject(id.value);
    if (success) {
        alertStore.setMessage(message, "success");
        router.push({ name: "adminManageContactRequests" });
    } else {
        alertStore.setMessage(message, "error")
        alertStore.$fire();
    }
}

const updateObjectHandler = async () => {
    const { success, message } = await contactRequestStore.updateObject(contactRequest.value);
}

onMounted(async () => {
    await contactRequestStore.$fetch();
    redirectIfObjectDoesntExists();
    contactRequest.value = await contactRequestStore.get(id.value);
})
</script>

<template>
    <div class="container">
        <MainContentTitle title="Contact Request Object" />
        <form class="row" @submit.prevent="">
            <div class="bg-dark text-white rounded rounded-2 p-2">
                <h4>Request Progress Status</h4>
                <hr />
                <ContactRequestTextArea input_label="Admin message" input_id="admin_message"
                    :input_value="contactRequest.admin_message" />
                <ContactRequestStatus input_id="status" input_label="Status" :input_value="contactRequest.status" />
            </div>

            <div class="bg-light text-dark mt-2 rounded rounded-2 px-2">
                <ContactRequestInput input_label="First Name" input_id="first_name"
                    :input_value="contactRequest.first_name" />
                <ContactRequestInput input_label="Last Name" input_id="last_name"
                    :input_value="contactRequest.last_name" />
                <ContactRequestInput input_label="Phone Number" input_id="phone_number"
                    :input_value="contactRequest.phone_number" />
                <ContactRequestInput input_label="Company" input_id="company_name"
                    :input_value="contactRequest.company_name" />
                <ContactRequestInput input_label="Job Position" input_id="job_position"
                    :input_value="contactRequest.job_position" />
                <ContactRequestTextArea input_label="Description" input_id="description"
                    :input_value="contactRequest.description" />
            </div>

            <div class="col-6 mt-2">
                <button class="btn btn-success me-2" @click="updateObjectHandler" type="button">Update</button>
                <button class="btn btn-danger ms-2" @click="deleteObjectHandler" type="button">Delete</button>
            </div>
        </form>
    </div>
</template>