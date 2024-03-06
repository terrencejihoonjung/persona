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

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    const updatedTaskState = { ...taskState, [name]: value };
    setTaskState(updatedTaskState);
  }

  function handleSave() {
    onSave(taskState);
    onExit();
  }

  function handleDelete() {
    onDelete(taskState.id);
    onExit();
  }

  function handleSubtasksReorder(newSubtasks: Task[]) {
    setTaskState((prevTaskState) => ({
      ...prevTaskState,
      subtasks: newSubtasks,
    }));
  }

  function handleCheckboxChange(id: string, completed: boolean) {
    setTaskState((prevTaskState) => {
      const updatedSubtasks = prevTaskState.subtasks!.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask
      );
      return { ...prevTaskState, subtasks: updatedSubtasks };
    });
  }

  function handleNewTask() {
    const newSubTask = {
      id: `subtask-${Date.now()}`,
      text: "Untitled",
      completed: false,
      type: "subtask",
    };
  }

  function handleSubtasksTextChange() {}

  function handleSubtaskDelete() {}

  return (
    <div className="z-30 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="flex flex-col justify-between relative top-20 mx-auto py-4 border w-2/5 max-h-1/2 shadow-lg rounded-2xl bg-white">
        <div className="flex flex-col">
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
              className="block text-xl font-semibold mb-2 pb-1 border-b"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={taskState.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-8 border-gray-400 border rounded-lg"
              placeholder="Description"
            ></textarea>

            <h2 className="font-semibold text-xl pb-1 border-b">Sub Tasks</h2>
            <div className="w-full px-4 text-center text-sm font-semibold text-black border-gray-200 border border-t-0 rounded-b-md cursor-pointer hover:bg-black hover:text-white hover:p-3 hover:rounded-b-xl transition-all duration-200 ease-in-out">
              Add Sub Task
            </div>
            <div className="w-full overflow-x-hidden overflow-y-auto">
              <DraggableList
                items={taskState.subtasks!}
                onDragEnd={handleSubtasksReorder}
              >
                {(isDragging) => (
                  <div className="py-2 w-full h-full overflow-x-hidden overflow-y-auto">
                    {taskState.subtasks!.map((subtask) => (
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
          </div>
        </div>

        <span className="flex justify-end items-center w-full px-4 mt-12 space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Save
          </button>
        </span>
      </div>
    </div>
  );
}

export default TaskModal;
