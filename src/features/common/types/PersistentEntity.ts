import { StringDate } from "./StringDate";

export interface PersistentEntity {
  _id: string;
  created: StringDate;
  updated: StringDate;
}
