import { post } from "../../common/utils/http";
import { CreateUserDto } from "../types/dto/CreateUserDto";
import { UserEntity } from "../types/User";

export const createUser = (createUserForm: CreateUserDto) =>
  post<UserEntity>("/users", createUserForm);
