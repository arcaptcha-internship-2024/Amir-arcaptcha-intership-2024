<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const router = useRouter();
onMounted(() => {
    userStore.$reset();
    router.push("/admin/login/");
})
</script>