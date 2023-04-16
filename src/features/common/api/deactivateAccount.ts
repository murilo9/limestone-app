import { delette } from "../utils/http";

export const deactivateAccount = (userId: string) =>
  delette(`/users/${userId}`);
