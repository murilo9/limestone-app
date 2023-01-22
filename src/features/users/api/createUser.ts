import { post } from "../../common/utils/http";
import { CreateUserDto } from "../types/dto/CreateUserDto";
import { User } from "../types/User";

export const createUser = (createUserForm: CreateUserDto) =>
  post<User>("/users", createUserForm);
