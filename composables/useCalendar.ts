import type { DateFormatType, LocaleCode } from "~/types";

export function formatDateTimeParts(
  date: Date,
  locale: LocaleCode,
  timezone: string,
  format: DateFormatType
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
