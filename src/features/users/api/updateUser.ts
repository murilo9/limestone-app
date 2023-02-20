import { put } from "../../common/utils/http";
import { UpdateUserDto } from "../types/dto/UpdateUserDto";
import { UserEntity } from "../types/User";

export const updateUser = (userId: string, updateUserForm: UpdateUserDto) =>
  put<UserEntity>(`/users/${userId}`, updateUserForm);
