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
    dark: false,
    moodTagIds: [] as string[],
    blocks: [] as DiaryBlock[],
    date: "", // today's date
    isSaved: false, // whether this page is saved to DB
  }),

  actions: {
    async createTodayPage() {
      const auth = useAuthStore();
      const userId = await auth.getUserId();
      if (!userId) return;

      this.date = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("diary_pages")
        .insert({
          user_id: userId,
          entry_date: this.date,
          title: this.dayTitle,
          background_color: this.backgroundColor,
          dark: this.dark,
          mood_tag_ids: this.moodTagIds,
          // weather : todo later
        })
        .select()
        .single();

      if (error || !data) {
        notify("Failed to create diary page", SnackbarType.error);
        return;
      }

      this.currentPageId = data.id;
      this.isSaved = true;
    },
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
          this.dark = data.dark;
          this.moodTagIds = data.mood_tag_ids || [];
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

      if (!this.isSaved) {
        await this.createTodayPage();
      }

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

      if (!this.isSaved) {
        await this.createTodayPage();
      }

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
    async updateDarkMode(dark: boolean) {
      // optimistic update
      const oldDarkModeValue = this.dark;
      this.dark = dark;

      if (!this.isSaved) {
        await this.createTodayPage();
      }

      // DB update
      const { error } = await supabase
        .from("diary_pages")
        .update({ dark: dark })
        .eq("id", this.currentPageId);

      if (error) {
        // rollback
        this.dark = oldDarkModeValue;
        notify("Failed to update dark mode", SnackbarType.error);
      } else {
        notify("Dark mode updated", SnackbarType.success);
      }
    },
    async updateMoodTags(tags: string[]) {
      // optimistic update
      const oldMoodTagIds = this.moodTagIds;
      this.moodTagIds = tags;

      if (!this.isSaved) {
        await this.createTodayPage();
      }

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
