<script setup>
import MainContentTitle from './components/MainContentTitle.vue';
import ContactRequestInput from './components/ContactRequestInput.vue';
import ContactRequestTextArea from './components/ContactRequestTextArea.vue';
import ContactRequestStatus from './components/ContactRequestStatus.vue';
import { useContactRequestStore } from '@/store/contactRequests';
import { useAlertStore } from '@/store/alerts';
import { ref } from 'vue';

const contactRequests = useContactRequestStore();
const alertStore = useAlertStore();
const first_name = ref("");
const last_name = ref("");
const company_name = ref("");
const phone_number = ref("");
const job_position = ref("");
const description = ref("");
const requestStatus = ref("");
const admin_message = ref("");

const contactRequestObject = () => {
    return {
        first_name: first_name.value,
        last_name: last_name.value,
        company_name: company_name.value,
        phone_number: phone_number.value,
        job_position: job_position.value,
        description: description.value,
        status: requestStatus.value,
        admin_message: admin_message.value,
    }
}

const formSubmitHandler = async () => {
    console.log(contactRequestObject());
    const { status, errorMessage } = await contactRequests.create(contactRequestObject())
    if (status) {
        alertStore.setMessage("Object Created", "success");
    } else {
        alertStore.setMessage(errorMessage, "error");
        alertStore.$fire();
    }
}
</script>

<template>
    <div class="container">
        <MainContentTitle title="Create contact request:" />
        <form class="row" @submit.prevent="formSubmitHandler">
            <div class="bg-dark text-white rounded rounded-2 p-2">
                <h4>Request Progress Status</h4>
                <hr />
                <ContactRequestTextArea input_label="Admin message" @data="query => admin_message = query" />
                <ContactRequestStatus input_label="Status" @data="query => requestStatus = query" />
            </div>
            <div class="bg-light text-dark mt-2 rounded rounded-2 px-2">
                <ContactRequestInput input_label="First Name" @data="query => first_name = query" />
                <ContactRequestInput input_label="Last Name" @data="query => last_name = query" />
                <ContactRequestInput input_label="Phone Number" @data="query => phone_number = query" />
                <ContactRequestInput input_label="Company" @data="query => company_name = query" />
                <ContactRequestInput input_label="Job Position" @data="query => job_position = query" />
                <ContactRequestTextArea input_label="Description" @data="query => description = query" />
            </div>
            <div class="col-6 mt-2">
                <button class="btn btn-success me-2" type="submit">Create</button>
            </div>
        </form>
    </div>
</template>