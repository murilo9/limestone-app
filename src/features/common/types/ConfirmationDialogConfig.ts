import { ConfirmationDialogAction } from "./ConfirmationDialogAction";

export type ConfirmationDialogConfig = {
  message: string;
  title?: string;
  actions: ConfirmationDialogAction[];
  hideCancelAction?: boolean;
};
