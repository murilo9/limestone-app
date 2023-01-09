import { PersistentEntity } from "../../common/types/PersistentEntity";

export interface CardComment extends PersistentEntity {
  author: string;
  body: string;
}
