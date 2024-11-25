<script setup>
import { useContactRequestStore } from '@/store/contactRequests';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainContentTitle from './components/MainContentTitle.vue';
import { useAlertStore } from '@/store/alerts';
import axios from "axios";
const alertStore = useAlertStore();
const contactRequestStore = useContactRequestStore();
const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const first_name = ref("");
const last_name = ref("");
const company_name = ref("");
const phone_number = ref("");
const job_position = ref("");
const description = ref("");
const requestStatus = ref("not-checked");
const admin_message = ref("");
const comments = ref([]);

const redirectIfObjectDoesntExists = () => {
    if (!contactRequestStore.exists(id.value)) {
        router.push({ name: 'adminManageContactRequests' })
    }
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
    await createCommentForContactRequest();
    let updatedData = getUpdatedData();
    const { success, message } = await contactRequestStore.updateObject(updatedData);
    if (success) {
        alertStore.setMessage(message, "success");
        router.push({ name: "adminManageContactRequests" });
    } else {
        alertStore.setMessage(message, "error");
        alertStore.$fire();
    }
}

const getUpdatedData = () => {
    return {
        id: id.value,
        first_name: first_name.value,
        last_name: last_name.value,
        company_name: company_name.value,
        phone_number: phone_number.value,
        job_position: job_position.value,
        description: description.value,
        status: requestStatus.value
    }
}

const assignDataToRefVariables = (data) => {
    first_name.value = data.first_name
    last_name.value = data.last_name
    company_name.value = data.company_name
    phone_number.value = data.phone_number
    job_position.value = data.job_position
    description.value = data.description
    requestStatus.value = data.status
}

const createCommentForContactRequest = async () => {
    if (admin_message.value.length === 0) {
        return;
    }
    await axios.post(`http://localhost:8000/api/contact/${id.value}/comment/create/`, { message: admin_message.value }, { withCredentials: true })
        .catch(error => {
            let errorMessage = error.response.data.error;
            alertStore.setMessage(errorMessage, "error");
            alertStore.$fire();
        })
}

const retrieveContactRequests = async () => {
    await axios.get(`http://localhost:8000/api/contact/${id.value}/comment/all/`, { withCredentials: true })
        .then(({ data }) => {
            comments.value = data;
        })
        .catch(error => {
            let errorMessage = error.response.data.error;
            alertStore.setMessage(errorMessage, "error");
            alertStore.$fire();
        })
}

onMounted(async () => {
    await contactRequestStore.$fetch();
    redirectIfObjectDoesntExists();
    let contactRequestData = await contactRequestStore.get(id.value);
    assignDataToRefVariables(contactRequestData);
    await retrieveContactRequests();
})
</script>

<template>
    <div class="container">
        <MainContentTitle title="Contact Request Object" />
        <form class="row" @submit.prevent="updateObjectHandler">
            <div class="bg-dark text-white rounded rounded-2 p-2">
                <h4>Request Progress Status</h4>
                <hr />
                <div class="col-12 my-2">
                    <label for="admin_message" class="mb-1">
                        Admin Message:
                    </label>
                    <textarea type="text" class="form-control" v-model="admin_message" id="admin_message"></textarea>
                </div>
                <div class="col-12 my-2">
                    <label for="status" class="mb-1">
                        Status:
                    </label>
                    <select class="form-select" name="status" v-model="requestStatus">
                        <option :selected="requestStatus === 'not-checked'" value="not-checked">Not checked</option>
                        <option :selected="requestStatus === 'in-progress'" value="in-progress">In progress</option>
                        <option :selected="requestStatus === 'completed'" value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <div class="bg-light text-dark mt-2 rounded rounded-2 px-2">
                <div class="col-12 my-2">
                    <label for="first_name" class="mb-1">
                        First Name:
                    </label>
                    <input type="text" class="form-control" v-model="first_name" id="first_name" />
                </div>
                <div class="col-12 my-2">
                    <label for="last_name" class="mb-1">
                        Last Name:
                    </label>
                    <input type="text" class="form-control" v-model="last_name" id="last_name" />
                </div>
                <div class="col-12 my-2">
                    <label for="phone_number" class="mb-1">
                        Phone Number:
                    </label>
                    <input type="text" class="form-control" v-model="phone_number" id="phone_number" />
                </div>
                <div class="col-12 my-2">
                    <label for="company_name" class="mb-1">
                        Company Name:
                    </label>
                    <input type="text" class="form-control" v-model="company_name" id="company_name" />
                </div>
                <div class="col-12 my-2">
                    <label for="job_position" class="mb-1">
                        Job position:
                    </label>
                    <input type="text" class="form-control" v-model="job_position" id="job_position" />
                </div>
                <div class="col-12 my-2">
                    <label for="description" class="mb-1">
                        Description:
                    </label>
                    <textarea type="text" class="form-control" id="description" v-model="description"></textarea>
                </div>
            </div>

            <div class="col-6 mt-2">
                <button class="btn btn-success me-2" type="submit">Update</button>
                <button class="btn btn-danger ms-2" @click="deleteObjectHandler" type="button">Delete</button>
            </div>
        </form>
        <div class="row bg-dark text-light my-2 p-2 rounded rounded-2" v-if="comments">
            <h3>Admin comments: </h3>
            <div class="col-12 bg-white text-dark my-2 rounded rounded-2 p-1" v-for="comment in comments.reverse()">
                <h6>Created at: {{ new Date(comment.created_at).toLocaleString() }}</h6>
                <p>
                    {{ comment.message }}
                </p>
            </div>
        </div>
    </div>
</template>