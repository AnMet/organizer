export const SnackbarType = {
  success: "success",
  error: "error",
  info: "info",
} as const;
export type SnackbarTypeKey = keyof typeof SnackbarType;
