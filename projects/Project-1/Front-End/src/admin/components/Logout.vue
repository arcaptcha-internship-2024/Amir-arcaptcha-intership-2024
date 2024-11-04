<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const router = useRouter();
onMounted(async () => {
    await userStore.logout();
    router.push("/admin/login/");
})
</script>