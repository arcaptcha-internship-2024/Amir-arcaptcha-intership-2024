<script setup>
import { ref } from 'vue';
const usernameFilter = ref("");
const roleFilter = ref("");
</script>

<template>
    <form @submit.prevent="" class="row p-2 bg-dark text-light">
        <h5>
            Filter results:
        </h5>
        <div class="col-12 col-md-6">
            <input type="text" placeholder="Type username..." class="form-control" v-model="usernameFilter"
                @input="$emit('filterUsername', usernameFilter)" />
        </div>
        <div class="col-6 col-md-3">
            <select class="form-select" name="select-role" v-model="roleFilter"
                @change="$emit('filterRole', roleFilter)">
                <option disabled value="">Role Filter</option>
                <option value="all">All</option>
                <option value="superuser">Superusers</option>
                <option value="sale-manager">Sale Managers</option>
            </select>
        </div>
    </form>
</template>