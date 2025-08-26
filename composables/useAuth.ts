import { ref } from "vue";
import { supabase } from "~/utils/supabaseClient";

const userId = ref<string | null>(null);

export const useAuth = () => {
  const getCurrentUserId = async (): Promise<string> => {
    if (userId.value) return userId.value;

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      throw new Error("User not authenticated");
    }

    userId.value = data.user.id;
    return userId.value;
  };

  return { getCurrentUserId, userId };
};
