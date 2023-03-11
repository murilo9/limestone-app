import { PersistentEntity } from "../../common/types/PersistentEntity";

export interface BoardEntity extends PersistentEntity {
  title: string;
  admin: string;
  owner: string;
  users: string[];
  archived: boolean;
}
