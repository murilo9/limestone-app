import { PersistentEntity } from "../../common/types/PersistentEntity";
import { BoardColumn } from "./BoardColumn";

export interface Board extends PersistentEntity {
  title: string;
  admin: string;
  owner: string;
  columns: { [id: string]: BoardColumn };
  users: { [id: string]: string };
  archived: boolean;
}
