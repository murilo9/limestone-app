import { PersistentEntity } from "../../common/types/PersistentEntity";
import { CardComment } from "./CardComment";

export interface Card extends PersistentEntity {
  title: string;
  assignee: string | null;
  priority: number;
  comments: { [id: string]: CardComment };
  commentsCount?: number;
}
