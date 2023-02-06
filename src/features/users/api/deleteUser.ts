import { delette } from "../../common/utils/http";

export const deleteUser = (userId: string) => delette(`/users/${userId}`);
