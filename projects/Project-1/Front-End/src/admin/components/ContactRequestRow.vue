<script setup>
defineProps(['id', 'number', 'first_name', 'last_name', 'phone_number', 'status']);
</script>
<template>
    <div class="row bg-secondary p-2 rounded text-white align-items-center my-1">
        <div class="col-1">{{ number }}</div>
        <div class="col-4">{{ first_name + " " + last_name }}</div>
        <div class="col-3">{{ phone_number }}</div>
        <div class="col-2">
            <button class="btn btn-success" v-if="status === 'completed'">Completed</button>
            <button class="btn btn-danger" v-else-if="status === 'not-checked'">Not Checked</button>
            <button class="btn btn-warning" v-else-if="status === 'in-progress'">In progress</button>
        </div>
        <div class="col-2">
            <RouterLink :to="{ name: 'contactRequestDetail', params: { id } }" class="btn btn-light">View</RouterLink>
        </div>
    </div>
</template>