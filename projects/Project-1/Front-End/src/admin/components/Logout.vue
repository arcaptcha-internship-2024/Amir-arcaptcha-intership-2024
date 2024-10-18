<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
    localStorage.removeItem("token");
    router.push("/admin/login/");
})
</script>