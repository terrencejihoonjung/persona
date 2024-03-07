import { useState, useCallback } from "react";
import { Task } from "../types/TaskTypes";
import { mockTasks } from "../data/mockTasks";

export default function useTaskWidget() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task>({} as Task);

  const openEditModal = useCallback((task: Task) => {
    setEditingTask(task); // Set the task to be edited
    setIsModalOpen(true); // Open the modal
  }, []);

  const handleAddNewTask = useCallback(() => {
    const newTask = {
      id: `task-${Date.now()}`,
      text: "Untitled",
      description: "",
      completed: false,
      type: "task",
      subtasks: [],
    };

    setEditingTask(newTask);
    setIsModalOpen(true);
  }, []);

  const handleSaveTask = useCallback(
    (savedTask: Task) => {
      const taskExists = tasks.find((task) => task.id === savedTask.id);

      if (taskExists) {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === savedTask.id ? savedTask : task
          )
        );
      } else {
        setTasks((prevTasks) => [savedTask, ...prevTasks]);
      }
    },
    [tasks]
  );

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const handleExitModal = useCallback(() => {
    setEditingTask({} as Task);
    setIsModalOpen(false); // Close the modal
  }, []);

  const handleCheckboxChange = useCallback((id: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  }, []);

  return {
    tasks,
    setTasks,
    isModalOpen,
    editingTask,
    openEditModal,
    handleAddNewTask,
    handleSaveTask,
    handleDeleteTask,
    handleExitModal,
    handleCheckboxChange,
  };
}
