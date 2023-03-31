import { SignUpForm } from "../types/SignUpForm";
import { post } from "../utils/http";

export const signUp = (signUpForm: SignUpForm) => post("/signup", signUpForm);
