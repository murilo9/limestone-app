import { DELETE } from "../../common/utils/http";

export const deleteUser = (userId: string) => DELETE(`/users/${userId}`);
