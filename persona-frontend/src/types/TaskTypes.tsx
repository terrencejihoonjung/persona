export type Task = {
  id: string;
  text: string;
  completed: boolean;
  type: string;
  description?: string;
  subtasks?: Task[];
};
