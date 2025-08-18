import { defineStore } from "pinia";
import {
  type DateFormatType,
  type LocaleCode,
  type TimezoneCode,
} from "~/types";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    timezone: "Europe/Paris" as TimezoneCode,
    format: "long" as DateFormatType,
    locale: "fr-FR" as LocaleCode,
  }),
  actions: {
    setTimezone(tz: TimezoneCode) {
      this.timezone = tz;
    },
    setFormat(fmt: DateFormatType) {
      this.format = fmt;
    },
    setLocale(fmt: LocaleCode) {
      this.locale = fmt;
    },
  },
});
