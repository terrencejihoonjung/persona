import { useState } from "react";
import { Task } from "../../../types/TaskTypes";
import DraggableList from "../../../components/ui/DraggableList";
import SortableItem from "./SortableItem"; // For sub-tasks

type TaskModalProps = {
  task: Task;
  onSave: (savedTask: Task) => void;
  onDelete: (taskId: string) => void;
  onExit: () => void;
};

function TaskModal({ task, onSave, onExit, onDelete }: TaskModalProps) {
  const [taskState, setTaskState] = useState<Task>(task!);
  const [subtasks, setSubtasks] = useState<Task[]>(task.subtasks!);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedTaskState = { ...taskState, [name]: value };
    setTaskState(updatedTaskState);
    onSave(updatedTaskState);
  };

  const handleCheckboxChange = (id: string, completed: boolean) => {
    setTaskState((prevTaskState) => {
      const updatedSubtasks = prevTaskState.subtasks!.map((subtask) => {
        if (subtask.id === id) {
          return { ...subtask, completed };
        }
        return subtask;
      });

      return { ...prevTaskState, subtasks: updatedSubtasks };
    });
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
            name="text"
            value={taskState.text}
            onChange={handleInputChange}
            className="appearance-none outline-none font-bold text-3xl mb-10"
            placeholder="Task Name"
          />

          <label
            htmlFor="description"
            className="block text-xl font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskState.description}
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
        <span className="flex justify-end items-center w-full px-4 mt-12 space-x-4">
          <button
            onClick={() => onDelete(taskState.id)}
            className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Delete
          </button>
          <button
            onClick={() => onSave(taskState)}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-xl hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Save
          </button>
        </span>
      </div>
    </div>
  );
}

export default TaskModal;
