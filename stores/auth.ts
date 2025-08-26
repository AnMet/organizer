import type { User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "~/utils/supabaseClient";

export const useAuthStore = defineStore("auth", () => {
  const userId = ref<string | null>(null);
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      userId.value = null;
      user.value = null;
      isAuthenticated.value = false;
      return;
    }

    userId.value = data.user.id;
    user.value = data.user;
    isAuthenticated.value = true;
  };

  const getUserId = async (): Promise<string | null> => {
    if (!userId.value) {
      await fetchUser();
    }
    return userId.value;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    userId.value = null;
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    userId,
    user,
    isAuthenticated,
    fetchUser,
    getUserId,
    logout,
  };
});
