// 📝 Date formats
export const dateFormat = {
  full: "full",
  long: "long",
  medium: "medium",
  short: "short",
} as const;

export type DateFormatType = (typeof dateFormat)[keyof typeof dateFormat];
export const dateFormatOptions: DateFormatType[] = Object.values(dateFormat);

// 🈶 Locales
export const locales = {
  "fr-FR": "Français (France)",
  "en-US": "English (United States)",
  "de-DE": "Deutsch (Deutschland)",
  "it-IT": "Italiano (Italia)",
  "es-ES": "Español (España)",
  "pt-BR": "Português (Brasil)",
} as const;

export type LocaleCode = keyof typeof locales;
export const localeOptions = Object.entries(locales).map(([value, label]) => ({
  value: value as LocaleCode,
  label,
}));

// 🌍 Timezones
export const timezones = {
  UTC: "UTC",
  "Europe/Paris": "Paris",
  "America/New_York": "New York",
  "Asia/Tokyo": "Tokyo",
  "Australia/Sydney": "Sydney",
  "Europe/Moscow": "Moscow",
} as const;

export type TimezoneCode = keyof typeof timezones;
export const timezoneOptions = Object.entries(timezones).map(
  ([value, label]) => ({
    value: value as TimezoneCode,
    label,
  })
);
