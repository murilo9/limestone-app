import { SignInForm } from "../types/SignInForm";
import { post } from "../utils/http";

export const signIn = (signInForm: SignInForm) =>
  post<{ access_token: string }>("/signin", signInForm);
