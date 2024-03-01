export type Task = {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  subtasks: SubTask[];
};

export type SubTask = {
  id: number;
  text: string;
  completed: boolean;
};
