import { signIn } from "../api/signIn";
import { SignInForm } from "../types/SignInForm";

export const useAuth = () => ({
  access_token: localStorage.getItem("access_token"),
  signIn: async (signInForm: SignInForm) => {
    const signInRes = await signIn(signInForm);
    const { access_token } = signInRes.data;
    localStorage.setItem("access_token", access_token);
    window.location.reload();
  },
  signOut: () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  },
});
