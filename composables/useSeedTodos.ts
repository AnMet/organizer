import { supabase } from "~/utils/supabaseClient";

export async function useSeedTodos(userId: string) {
  // Step 1: Check if user already seeded
  const { data: meta, error: metaError } = await supabase
    .from("user_metadata")
    .select("seeded")
    .eq("user_id", userId)
    .single();

  if (metaError && metaError.code !== "PGRST116") {
    console.error("❌ Error checking seed status:", metaError);
    return false;
  }

  if (meta?.seeded) {
    console.log("⏭️ User already seeded.");
    return false;
  }

  // Step 2: Define 4 todos to seed
  const todos = [
    {
      user_id: userId,
      title: "Plan the day",
      description: "Review calendar and prioritize tasks",
      status: "next",
    },
    {
      user_id: userId,
      title: "Check emails",
      description: "Respond to urgent messages and archive spam",
      status: "doing",
    },
    {
      user_id: userId,
      title: "Take a walk",
      description: "Short walk to refresh and reset focus",
      status: "later",
    },
    {
      user_id: userId,
      title: "Read something inspiring",
      description: "10 minutes of a book, article, or quote",
      status: "later",
    },
  ];

  // Step 3: Insert todos
  const { data, error } = await supabase.from("todos").insert(todos);

  if (error) {
    console.error("❌ Seeding error:", error);
    return false;
  }

  // Step 4: Mark user as seeded
  const { error: updateError } = await supabase
    .from("user_metadata")
    .upsert({ user_id: userId, seeded: true });

  if (updateError) {
    console.error("❌ Error updating seed status:", updateError);
    return false;
  }

  console.log("✅ Seeded todos:", data);
  return true;
}
