<script setup>
import { ref } from 'vue';

const checkStatusFilter = ref("");
const searchQuery = ref("");
</script>

<template>
    <form @submit.prevent="" class="row p-2 bg-dark text-light">
        <h5>
            Filter results:
        </h5>
        <div class="col-12 col-md-9 my-1 my-md-0">
            <input type="text" placeholder="Type something..." class="form-control" v-model="searchQuery"
                @input="$emit('searchBy', searchQuery)" />
        </div>
        <div class="col-6 col-md-3 my-1 my-md-0">
            <select class="form-select" name="check-status" v-model="checkStatusFilter"
                @change="$emit('filterBy', checkStatusFilter)">
                <option disabled value="">Check status</option>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In progress</option>
                <option value="not-checked">Not Checked</option>
            </select>
        </div>
    </form>
</template>