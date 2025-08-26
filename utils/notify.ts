import { useSnackbarStore } from "~/stores/snackbar";
import { type SnackbarTypeKey } from "~/types";

export function notify(message: string, type: SnackbarTypeKey) {
  useSnackbarStore().show(message, type);
}
