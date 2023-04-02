import { SignInForm } from "../types/SignInForm";
import { post } from "../utils/http";

export const googleSign = (googleAccessToken: string) =>
  post<{ access_token: string }>("/google-sign", { googleAccessToken });
