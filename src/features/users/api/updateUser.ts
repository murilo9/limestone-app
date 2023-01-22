import { put } from "../../common/utils/http";
import { UpdateUserDto } from "../types/dto/UpdateUserDto";
import { User } from "../types/User";

export const updateUser = (userId: string, updateUserForm: UpdateUserDto) =>
  put<User>(`/users/${userId}`, updateUserForm);
