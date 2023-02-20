import { PersistentEntity } from "../../common/types/PersistentEntity";
import { UserNotificationOptions } from "./UserNotificationOptions";
import { UserRole } from "./UserRole";

export interface UserEntity extends PersistentEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdBy: string | null;
  verified: boolean;
  verifyId: string;
  active: boolean;
  notificationOptions: UserNotificationOptions;
}
