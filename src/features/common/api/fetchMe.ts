import { User } from "../../users/types/User";
import { get } from "../utils/http";

export const fetchMe = () => get<User>("/me");
