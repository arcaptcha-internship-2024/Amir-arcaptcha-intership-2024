<script setup>
defineProps(["input_label", "input_id", "input_value"])
</script>
<template>
    <div class="col-12 my-2">
        <label :for="input_id" class="mb-1">
            {{ input_label }}:
        </label>
        <input type="text" class="form-control" :id="input_id" :value="input_value" />
    </div>
</template>