import { post } from "../utils/http";

export const passwordChange = (currentPassword: string, newPassword: string) =>
  post("/password-change", {
    currentPassword,
    newPassword,
  });
