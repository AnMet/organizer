import { ref } from "vue";
import type { User } from "~/types";
import { supabase } from "~/utils/supabaseClient";

const user = ref<User | null>(null);

export async function loadUser() {
  const { data } = await supabase.auth.getUser();
  user.value = data?.user || null;
}

export function useUser() {
  return { user };
}
