import useTaskModal from "../../../hooks/useTaskModal"; // Adjust the import path
import { Task } from "../../../types/TaskTypes";
import DraggableList from "../../../components/ui/DraggableList";
import SortableItem from "./SortableItem";

type TaskModalProps = {
  task: Task;
  onSave: (savedTask: Task) => void;
  onDelete: (taskId: string) => void;
  onExit: () => void;
};

function TaskModal({ task, onSave, onExit, onDelete }: TaskModalProps) {
  const {
    taskState,
    handleInputChange,
    handleSave,
    handleDelete,
    handleSubtasksReorder,
    handleCheckboxChange,
    handleNewSubtask,
    handleSubtaskTextChange,
    handleSubtaskDelete,
  } = useTaskModal(task, onSave, onDelete, onExit);

  return (
    <div className="z-30 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="flex flex-col justify-between relative top-20 mx-auto py-4 border w-2/5 max-h-2/3 shadow-lg rounded-2xl bg-white">
        <div className="flex flex-col max-h-4/5">
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
            <div
              onClick={handleNewSubtask}
              className="w-full px-4 text-center text-sm font-semibold text-black border-gray-200 border border-t-0 rounded-b-md cursor-pointer hover:bg-black hover:text-white hover:p-3 hover:rounded-b-xl transition-all duration-200 ease-in-out"
            >
              Add Sub Task
            </div>
            <div className="w-full max-h-80 overflow-x-hidden overflow-y-auto grow">
              <DraggableList
                items={taskState.subtasks!}
                onDragEnd={handleSubtasksReorder}
              >
                {(isDragging) => (
                  <>
                    {taskState.subtasks!.map((subtask) => (
                      <SortableItem
                        key={subtask.id}
                        task={subtask}
                        isDragging={isDragging}
                        handleCheckboxChange={handleCheckboxChange}
                        handleSubtaskTextChange={handleSubtaskTextChange}
                        handleSubtaskDelete={handleSubtaskDelete}
                      />
                    ))}
                  </>
                )}
              </DraggableList>
            </div>
          </div>
        </div>

        <span className="flex justify-end items-center w-full px-4 mt-12 space-x-4 h-1/5">
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
