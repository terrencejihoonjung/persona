import { useState, useCallback } from "react";
import { Task } from "../types/TaskTypes";

function useTaskModal(
  task: Task,
  onSave: (task: Task) => void,
  onDelete: (id: string) => void,
  onExit: () => void
) {
  const [taskState, setTaskState] = useState<Task>(task);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTaskState((prevTaskState) => ({ ...prevTaskState, [name]: value }));
    },
    []
  );

  const handleSave = useCallback(() => {
    onSave(taskState);
    onExit();
  }, [taskState, onSave, onExit]);

  const handleDelete = useCallback(() => {
    onDelete(taskState.id);
    onExit();
  }, [taskState.id, onDelete, onExit]);

  const handleSubtasksReorder = useCallback((newSubtasks: Task[]) => {
    setTaskState((prevTaskState) => ({
      ...prevTaskState,
      subtasks: newSubtasks,
    }));
  }, []);

  const handleCheckboxChange = useCallback((id: string, completed: boolean) => {
    setTaskState((prevTaskState) => {
      const updatedSubtasks = prevTaskState.subtasks?.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask
      );
      return { ...prevTaskState, subtasks: updatedSubtasks };
    });
  }, []);

  const handleNewSubtask = useCallback(() => {
    const newSubTask = {
      id: `subtask-${Date.now()}`, // Ensure unique ID
      text: "",
      completed: false,
      type: "subtask",
    };
    setTaskState((prevState) => ({
      ...prevState,
      subtasks: [newSubTask, ...prevState.subtasks!],
    }));
  }, []);

  const handleSubtaskTextChange = useCallback((id: string, newText: string) => {
    setTaskState((prevState) => ({
      ...prevState,
      subtasks: prevState.subtasks!.map((subtask) =>
        subtask.id === id ? { ...subtask, text: newText } : subtask
      ),
    }));
  }, []);

  const handleSubtaskDelete = useCallback((subtaskId: string) => {
    setTaskState((prevState) => ({
      ...prevState,
      subtasks: prevState.subtasks!.filter(
        (subtask) => subtask.id !== subtaskId
      ),
    }));
  }, []);

  return {
    taskState,
    handleInputChange,
    handleSave,
    handleDelete,
    handleSubtasksReorder,
    handleCheckboxChange,
    handleNewSubtask,
    handleSubtaskTextChange,
    handleSubtaskDelete,
  };
}

export default useTaskModal;
