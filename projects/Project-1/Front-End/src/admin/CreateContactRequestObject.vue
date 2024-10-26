<script setup>
import MainContentTitle from './components/MainContentTitle.vue';
import ContactRequestInput from './components/ContactRequestInput.vue';
import ContactRequestTextArea from './components/ContactRequestTextArea.vue';
import ContactRequestStatus from './components/ContactRequestStatus.vue';
</script>

<template>
    <div class="container">
        <MainContentTitle title="Create contact request:" />
        <form class="row" @submit.prevent="">
            <div class="bg-dark text-white rounded rounded-2 p-2">
                <h4>Request Progress Status</h4>
                <hr />
                <ContactRequestTextArea input_label="Admin message" />
                <ContactRequestStatus input_label="Status" />
            </div>

            <div class="bg-light text-dark mt-2 rounded rounded-2 px-2">
                <ContactRequestInput input_label="First Name" />
                <ContactRequestInput input_label="Last Name" />
                <ContactRequestInput input_label="Phone Number" />
                <ContactRequestInput input_label="Company" />
                <ContactRequestInput input_label="Job Position" />
                <ContactRequestTextArea input_label="Description" />
            </div>
            <div class="col-6 mt-2">
                <button class="btn btn-success me-2" type="button">Create</button>
            </div>
        </form>
    </div>
</template>