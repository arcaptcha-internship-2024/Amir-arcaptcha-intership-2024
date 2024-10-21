<script setup>
defineProps(['number', 'first_name', 'last_name', 'created_at', 'status']);
const displayDateFormat = (date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
}
</script>
<template>
    <div class="row bg-secondary p-2 rounded text-white align-items-center my-1">
        <div class="col-1">{{ number }}</div>
        <div class="col-4">{{ first_name + " " + last_name }}</div>
        <div class="col-3">{{ displayDateFormat(created_at) }}</div>
        <div class="col-2">
            <button class="btn btn-success" v-if="status">Checked</button>
            <button class="btn btn-danger" v-else>Not Checked</button>
        </div>
        <div class="col-2">
            <button class="btn btn-light">View</button>
        </div>
    </div>
</template>