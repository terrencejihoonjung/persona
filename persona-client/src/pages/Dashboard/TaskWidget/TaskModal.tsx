import { useState } from "react";
import { Task } from "../../../types/TaskTypes";
import DraggableList from "../../../components/ui/DraggableList";
import SortableItem from "./SortableItem"; // For sub-tasks

type TaskModalProps = {
  task: Task; // Task is optional, for adding a new task or editing an existing one
  onSave: (task: Task) => void; // Handler for saving the task
  onCancel: () => void; // Handler for canceling the task addition or edit
};

function TaskModal({ task, onSave, onCancel }: TaskModalProps) {
  const [taskState, setTaskState] = useState<Task>(task!);
  const [subtasks, setSubtasks] = useState<Task[]>(task.subtasks!);

  const handleCheckboxChange = (id: string, completed: boolean) => {
    setSubtasks((prevSubTasks) =>
      prevSubTasks.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask
      )
    );
  };

  const handleSave = () => {
    onSave({
      ...taskState!,
      subtasks: subtasks,
    });
  };

  return (
    <div className="z-30 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-12 border w-1/2 shadow-lg rounded-2xl bg-white">
        <input
          type="text"
          value={taskState.text}
          onChange={(e) => setTaskState({ ...taskState, text: e.target.value })}
          className="appearance-none outline-none mb-10 font-bold text-3xl"
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
          onChange={(e) =>
            setTaskState({ ...taskState!, description: e.target.value })
          }
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

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="px-6 py-3 mr-3 text-white bg-blue-500 rounded-2xl hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 text-white bg-gray-500 rounded-2xl hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
