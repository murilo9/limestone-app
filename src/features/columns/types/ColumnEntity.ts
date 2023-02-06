import { PersistentEntity } from "../../common/types/PersistentEntity";

export interface ColumnEntity extends PersistentEntity {
  title: string;
  index: number;
  boardId: string;
}
