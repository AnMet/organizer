import { supabase } from "~/utils/supabaseClient";

export async function useSeedTodos(userId: string) {
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
    {
      user_id: userId,
      title: "Reflect on progress",
      description: "End-of-day review and journaling",
      status: "next",
    },
  ];

  const { data, error } = await supabase.from("todos").insert({
    user_id: userId,
    title: "Plan the day",
    status: "next",
  });

  if (error) {
    console.error("❌ Seeding error:", error);
    return false;
  }

  console.log("✅ Seeded todos:", data);
  return true;
}
