export const timezones = [
  "UTC",
  "Europe/Paris",
  "America/New_York",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Europe/Moscow",
];

export const formats = ["full", "long", "medium", "short"];

export const locales = [
  { label: "Français (France)", value: "fr-FR" },
  { label: "English (United States)", value: "en-US" },
  { label: "Deutsch (Deutschland)", value: "de-DE" },
  { label: "Italiano (Italia)", value: "it-IT" },
  { label: "Español (España)", value: "es-ES" },
  { label: "Português (Brasil)", value: "pt-BR" },
];

export function formatDateTimeParts(
  date: Date,
  locale: string,
  timezone: string,
  format: "full" | "long" | "medium" | "short"
) {
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    dateStyle: format,
    timeStyle: undefined,
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    dateStyle: undefined,
    timeStyle: format,
  });

  return {
    date: dateFormatter.format(date),
    time: timeFormatter.format(date),
  };
}
