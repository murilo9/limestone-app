export type CreateCardDto = {
  title: string;
  description: string;
  assignee: string | null;
  priority: number;
};
