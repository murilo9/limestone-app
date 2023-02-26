import { get } from "../../common/utils/http";
import { UserEntity } from "../types/User";

export const fetchMe = () => get<UserEntity>("/me");
