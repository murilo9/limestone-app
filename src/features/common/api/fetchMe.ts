import { UserEntity } from "../../users/types/User";
import { get } from "../utils/http";

export const fetchMe = () => get<UserEntity>("/me");
