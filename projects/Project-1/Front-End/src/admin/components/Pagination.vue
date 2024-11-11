<script setup>
defineProps(["pagination_data"]);
</script>

<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item pointer" v-if="pagination_data.previous.has_previous">
                <span class="page-link" aria-label="Previous" @click="$emit('previous_page', pagination_data.previous.previous_page)">
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
            <li class="page-item pointer" v-if="pagination_data.previous.has_previous">
                <span class="page-link" @click="$emit('previous_page', pagination_data.previous.previous_page)">
                    {{ pagination_data.previous.previous_page }}
                </span>
            </li>
            <li class="page-item">
                <span class="page-link active">
                    {{ pagination_data.current_page }}
                </span>
            </li>
            <li class="page-item pointer" v-if="pagination_data.next.has_next">
                <span class="page-link" @click="$emit('next_page', pagination_data.next.next_page)">
                    {{ pagination_data.next.next_page }}
                </span>
            </li>
            <li class="page-item pointer" v-if="pagination_data.next.has_next">
                <span class="page-link" aria-label="Next" @click="$emit('next_page', pagination_data.next.next_page)">
                    <span aria-hidden="true">&raquo;</span>
                </span>
            </li>
        </ul>
    </nav>
</template>

<style lang="css">
.pointer {
    cursor: pointer;
}
</style>