<script setup>
defineProps(["input_label", "input_id", "input_value"]);
import { ref } from 'vue';
const inputData = ref("");
</script>
<template>
    <div class="col-12 my-2">
        <label :for="input_id" class="mb-1">
            {{ input_label }}:
        </label>
        <textarea type="text" class="form-control" :id="input_id" :value="input_value" :v-model="inputData"
        @input="$emit('input', inputData)"></textarea>
    </div>
</template>