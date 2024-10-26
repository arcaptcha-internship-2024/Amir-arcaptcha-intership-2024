<script setup>
defineProps(["input_label", "input_id", "input_value"])
</script>
<template>
    <div class="col-12 my-2">
        <label :for="input_id" class="mb-1">
            {{ input_label }}:
        </label>
        <select name="" id="" class="form-select">
            <option :selected="input_value === 'not-checked'" value="not-checked">Not checked</option>
            <option :selected="input_value === 'in-progress'" value="in-progress">In progress</option>
            <option :selected="input_value === 'completed'" value="completed">Completed</option>
        </select>
    </div>
</template>