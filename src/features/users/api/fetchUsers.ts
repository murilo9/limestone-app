import { get } from "../../common/utils/http";
import { User } from "../types/User";

export const fetchUsers = () => get<User[]>("/users");
