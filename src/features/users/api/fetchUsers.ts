import { get } from "../../common/utils/http";
import { UserEntity } from "../types/User";

export const fetchUsers = () => get<UserEntity[]>("/users");
