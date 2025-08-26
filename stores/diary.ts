import { defineStore } from "pinia";
import { SnackbarType } from "~/types";
import type { DiaryBlock } from "~/types/diary";
import { notify } from "~/utils/notify";
import { supabase } from "~/utils/supabaseClient";
import { useAuthStore } from "./auth";

export const useDiaryStore = defineStore("diary", {
  state: () => ({
    currentPageId: "",
    dayTitle: "",
    backgroundColor: "",
    moodTagIds: [] as string[],
    blocks: [] as DiaryBlock[],
    date: "", // today's date
    isSaved: false, // whether this page is saved to DB
  }),

  actions: {
    async loadTodayPage() {
      const auth = useAuthStore();
      const userId = await auth.getUserId();
      if (!userId) return;

      this.date = new Date().toISOString().split("T")[0];

      try {
        const { data, error } = await supabase
          .from("diary_pages")
          .select("*")
          .eq("entry_date", this.date)
          .eq("user_id", userId)
          .single();

        if (error) throw error;

        if (data) {
          this.currentPageId = data.id;
          this.dayTitle = data.title;
          this.backgroundColor = data.background_color;
          this.moodTagIds = data.mood_tag_ids;
          this.blocks = data.blocks || [];
          this.isSaved = true;
        } else {
          this.blocks = [];
          this.isSaved = false;
        }
      } catch (err) {
        notify("Failed to load today's page", SnackbarType.error);

        this.blocks = [];
        this.isSaved = false;
      }
    },
    async updateDayTitle(text: string) {
      // optimistic update
      const oldTitle = this.dayTitle;
      this.dayTitle = text;

      // DB update
      const { error } = await supabase
        .from("diary_pages")
        .update({ title: text })
        .eq("id", this.currentPageId);

      if (error) {
        // rollback
        this.dayTitle = oldTitle;
        notify("Failed to update title: " + error.message, SnackbarType.error);
      } else {
        notify("Title updated", SnackbarType.success);
      }
    },
    async updateBackgroundColor(color: string) {
      // optimistic update
      const oldBackgroundColor = this.backgroundColor;
      this.backgroundColor = color;

      // DB update
      const { error } = await supabase
        .from("diary_pages")
        .update({ background_color: color })
        .eq("id", this.currentPageId);

      if (error) {
        // rollback
        this.backgroundColor = oldBackgroundColor;
        notify("Failed to update background color", SnackbarType.error);
      } else {
        notify("Background color updated", SnackbarType.success);
      }
    },
    async updateMoodTags(tags: string[]) {
      // optimistic update
      const oldMoodTagIds = this.moodTagIds;
      this.moodTagIds = tags;

      // DB update
      const { error } = await supabase
        .from("diary_pages")
        .update({ mood_tag_ids: tags })
        .eq("id", this.currentPageId);

      if (error) {
        // rollback
        this.moodTagIds = oldMoodTagIds;
        notify("Failed to update mood tags", SnackbarType.error);
      } else {
        notify("Mood tags updated", SnackbarType.success);
      }
    },
  },
});
