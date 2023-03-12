import { UserNotificationOptions } from "../UserNotificationOptions";

export type UpdateUserDto = {
  firstName: string;
  lastName: string;
  title: string;
  notificationOptions: UserNotificationOptions;
};
