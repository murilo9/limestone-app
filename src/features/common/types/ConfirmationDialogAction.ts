export type ConfirmationDialogAction = {
  type: "primary" | "secondary" | "success" | "warning" | "error";
  title: string;
  onClick: () => void;
};
