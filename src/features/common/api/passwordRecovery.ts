import { post } from "../utils/http";

export const passwordRecovery = (email: string) =>
  post(`/password-recover/${email}`);
