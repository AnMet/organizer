import { defineStore } from "pinia";
import { SnackbarType, type Todo } from "~/types";
import { notify } from "~/utils/notify";
import { supabase } from "~/utils/supabaseClient";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),

  actions: {
    async seedTodos(userId: string, force?: boolean): Promise<boolean> {
      if (!force) {
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
          console.log("⏭️ Already seeded. Fetching todos.");
          await this.fetchTodos(userId);
          return true;
        }
      }

      const todosToInsert: Omit<Todo, "id" | "created_at" | "updated_at">[] = [
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

      const { data, error } = await supabase
        .from("todos")
        .insert(todosToInsert)
        .select();

      if (error || !data) {
        console.error("❌ Seeding error:", error);
        notify(
          "Something went wrong duting task generation, please try later",
          SnackbarType.error
        );
        return false;
      }

      if (!force) {
        const { error: updateError } = await supabase
          .from("user_metadata")
          .upsert({ user_id: userId, seeded: true });

        if (updateError) {
          console.error("❌ Error updating seed status:", updateError);
          notify(
            "Something went wrong duting task generation, please try later",
            SnackbarType.error
          );

          return false;
        }
      }

      this.todos = data;
      console.log("✅ Seeded and todos loaded");
      notify("Sample tasks generated", SnackbarType.success);
      return true;
    },
    async fetchTodos(userId: string) {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("❌ Error fetching todos:", error);
        notify(
          "Something went wrong while getting tasks, please try later",
          SnackbarType.error
        );
        return;
      }

      this.todos = data || [];
    },
    async addTodo(newTodo: Omit<Todo, "id" | "created_at" | "updated_at">) {
      const { data, error } = await supabase
        .from("todos")
        .insert([newTodo])
        .select()
        .single();

      if (error || !data) {
        console.error("❌ Error adding todo:", error);
        notify(
          "Something went wrong while adding a new tasks, please try later",
          SnackbarType.error
        );
        return null;
      }

      this.todos = [...this.todos, data];
      console.log("✅ Todo added:", data);
      notify("Todo added", SnackbarType.success);
      return data;
    },
    async updateTodo(
      updated: Omit<Todo, "id" | "created_at" | "updated_at">,
      id: string
    ) {
      if (!id) {
        console.error("❌ Missing ID for update");
        notify(
          "Something went wrong while updating a tasks, please try later",
          SnackbarType.error
        );
        return null;
      }

      const todo = this.todos.find((t) => t.id === id);
      if (todo) Object.assign(todo, updated);

      const payload = {
        ...updated,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("todos")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("❌ Error updating todo:", error);
        notify(
          "Something went wrong while updating a tasks, please try later",
          SnackbarType.error
        );
        return null;
      }

      console.log("✅ Todo updated:", data);
      notify("Todo updated", SnackbarType.success);
      return data;
    },
    async deleteTodo(id: string) {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) {
        console.error("❌ Error deleting todo:", error);
        notify(
          "Something went wrong while deleting a tasks, please try later",
          SnackbarType.error
        );
        return false;
      }

      this.todos = this.todos.filter((t) => t.id !== id);
      notify("Task deleted", SnackbarType.success);

      // ✅ If no todos left, reset the sequence
      if (this.todos.length === 0) {
        const { error: seqError } = await supabase.rpc("reset_todos_sequence");
        if (seqError) {
          console.error("❌ Error resetting sequence:", seqError);
          notify(
            "Something went wrong while deleting a tasks, please try later",
            SnackbarType.error
          );
        } else {
          console.log("🔄 Sequence reset after full deletion");
        }
      }

      return true;
    },
  },
});
