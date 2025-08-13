import { supabase } from "~/utils/supabaseClient";

export async function useTodos(userId: string) {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("❌ Failed to fetch todos:", error.message);
    return [];
  }

  return data;
}
