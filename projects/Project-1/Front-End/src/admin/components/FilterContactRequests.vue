<script setup>
import { ref } from 'vue';

const checkStatusFilter = ref("");
const orderByDate = ref("");
</script>

<template>
    <form @submit.prevent="" class="row p-2 bg-dark text-light">
        <h5>
            Filter results:
        </h5>
        <div class="col-12 col-md-6">
            <input type="text" placeholder="Type something..." class="form-control" />
        </div>
        <div class="col-6 col-md-3">
            <select class="form-select" name="check-status" v-model="checkStatusFilter"
                @change="$emit('filterBy', checkStatusFilter)">
                <option disabled value="">Check status</option>
                <option value="all">All</option>
                <option value="checked">Checked</option>
                <option value="not-checked">Not Checked</option>
            </select>
        </div>
        <div class="col-6 col-md-3">
            <select class="form-select" name="check-status" v-model="orderByDate"
                @change="$emit('orderBy', orderByDate)">
                <option disabled value="">Ordering</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
            </select>
        </div>
    </form>
</template>