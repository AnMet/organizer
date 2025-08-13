import { supabase } from "~/utils/supabaseClient";

export async function useLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("❌ Logout error:", error.message);
    return false;
  }
  console.log("✅ Logged out");
  return true;
}
