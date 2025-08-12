import { defineStore } from "pinia";
import { type DateFormatType } from "~/types";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    timezone: "Europe/Paris",
    format: "long",
    local: "fr-FR",
  }),
  actions: {
    setTimezone(tz: string) {
      this.timezone = tz;
    },
    setFormat(fmt: DateFormatType) {
      this.format = fmt;
    },
  },
  // persist: true,
});
