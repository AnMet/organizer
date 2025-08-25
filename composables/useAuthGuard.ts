import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "~/utils/supabaseClient";

export function useAuthGuard() {
  const router = useRouter();
  const loading = ref(true);
  const userId = ref("");

  onMounted(async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      loading.value = false;
      router.push("/login");
      return;
    }

    userId.value = data.user.id;
    loading.value = false;
  });

  return { loading, userId };
}
