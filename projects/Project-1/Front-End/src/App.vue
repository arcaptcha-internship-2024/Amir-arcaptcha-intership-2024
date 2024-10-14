<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
const route = useRoute();
const showHeaderStatus = computed(() => route.meta.showHeader)
</script>

<template>
  <Header v-if="showHeaderStatus"></Header>
  <main>
    <RouterView />
  </main>
</template>