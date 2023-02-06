import { PersistentEntity } from "../../common/types/PersistentEntity";

export interface CardEntity extends PersistentEntity {
  columnId: string;
  title: string;
  assignee: string | null;
  priority: number;
  description: string;
}
