export type CreateCardDto = {
  title: string;
  index: number;
  description: string;
  assignee: string | null;
  priority: number;
};
