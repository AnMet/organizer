import { supabase } from "~/utils/supabaseClient";

export async function useLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ Login error:", error.message);
    return null;
  }

  console.log("✅ Logged in:", data);
  return data.session?.user;
}
