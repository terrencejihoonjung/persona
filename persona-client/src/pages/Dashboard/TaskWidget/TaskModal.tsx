import { useState } from "react";
import { Task } from "../../../types/TaskTypes";
import DraggableList from "../../../components/ui/DraggableList";
import SortableItem from "./SortableItem"; // For sub-tasks

type TaskModalProps = {
  task: Task; // Task is optional, for adding a new task or editing an existing one
  onSave: (task: Task) => void; // Handler for saving the task
  onDelete: (taskId: string) => void;
  onExit: () => void; // Handler for canceling the task addition or edit
};

function TaskModal({ task, onSave, onExit, onDelete }: TaskModalProps) {
  const [taskState, setTaskState] = useState<Task>(task!);
  const [subtasks, setSubtasks] = useState<Task[]>(task.subtasks!);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskState((prevTaskState) => ({ ...prevTaskState, [name]: value }));
  };

  const handleCheckboxChange = (id: string, completed: boolean) => {
    setSubtasks((prevSubTasks) =>
      prevSubTasks.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask
      )
    );
  };

  return (
    <div className="z-30 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto py-4 border w-2/5 shadow-lg rounded-2xl bg-white">
        <span className="flex justify-end items-center w-full px-4 mb-4">
          <button onClick={onExit} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
        <div className="flex flex-col px-8">
          <input
            type="text"
            value={taskState.text}
            onChange={handleInputChange}
            className="appearance-none outline-none font-bold text-3xl mb-10"
            placeholder="Task Name"
          />

          <label
            htmlFor="taskDescription"
            className="block text-xl font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="taskDescription"
            value={taskState!.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mb-8 border-gray-400 border rounded-2xl"
            placeholder="Description"
          ></textarea>

          <h2 className="font-semibold text-xl">Sub-Tasks</h2>
          <DraggableList items={subtasks} onDragEnd={setSubtasks}>
            {(isDragging) => (
              <div className="py-2 w-full h-full overflow-x-hidden overflow-y-auto">
                {subtasks.map((subtask) => (
                  <SortableItem
                    key={subtask.id}
                    task={subtask}
                    isDragging={isDragging}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            )}
          </DraggableList>
        </div>
        <span className="flex justify-end items-center w-full px-4 mt-12">
          <button onClick={() => onDelete(taskState.id)} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}

export default TaskModal;
