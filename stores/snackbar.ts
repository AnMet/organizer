import { defineStore } from "pinia";
import { SnackbarType, type SnackbarTypeKey } from "~/types";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    visible: false,
    message: "",
    type: SnackbarType.info as SnackbarTypeKey,
  }),
  actions: {
    show(message: string, type: SnackbarTypeKey = SnackbarType.info) {
      this.message = message;
      this.type = type;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
});
