export type UpdateCardDto = {
  title: string;
  index: number;
  description: string;
  assignee: string | null;
  priority: number;
  columnId: string;
};
