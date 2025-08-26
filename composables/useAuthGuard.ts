import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

export const useAuthGuard = (redirectPath = "/login") => {
  const router = useRouter();
  const loading = ref(true);
  const userId = ref<string | null>(null);

  onMounted(async () => {
    try {
      const { getCurrentUserId } = useAuth();
      userId.value = await getCurrentUserId();
    } catch (err) {
      router.push(redirectPath);
    } finally {
      loading.value = false;
    }
  });

  return { loading, userId };
};
