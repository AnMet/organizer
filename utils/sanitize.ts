export function stripEmptyFields<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== "") {
      (result as any)[key] = value;
    }
  }

  return result;
}
