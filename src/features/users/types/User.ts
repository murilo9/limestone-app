import { PersistentEntity } from "../../common/types/PersistentEntity";
import { SignProvider } from "../../common/types/SignProvider";
import { UserNotificationOptions } from "./UserNotificationOptions";

export interface UserEntity extends PersistentEntity {
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  createdBy: string | null;
  verified: boolean;
  verifyId: string;
  active: boolean;
  notificationOptions: UserNotificationOptions;
  signProvider: SignProvider;
}
