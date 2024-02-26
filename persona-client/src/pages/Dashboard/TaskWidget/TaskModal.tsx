import { useState } from "react";
import { Task } from "../../../types/TaskTypes";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // For sub-tasks

type TaskModalProps = {
  task: Task | null; // Task is optional, for adding a new task or editing an existing one
  onSave: (task: Task) => void; // Handler for saving the task
  onCancel: () => void; // Handler for canceling the task addition or edit
  handleCheckboxChange: (id: number, completed: boolean) => void;
};

function TaskModal({
  task,
  onSave,
  onCancel,
  handleCheckboxChange,
}: TaskModalProps) {
  const [taskState, setTaskState] = useState<Task | null>(task);
  const [subtasks, setSubtasks] = useState<Task[]>(task?.subtasks || []);

  // Actively detects mouse clicks and or touch (finger click)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // Handles the re-ordering of tasks after a drag-drop action
  const handleDragEnd = (e: DragEndEvent) => {
    // active is the task being dragged, over is the task the active was dropped over
    const { active, over } = e;

    // If we dropped over a task and active and over are different tasks
    if (over && active.id !== over.id) {
      const oldIndex = subtasks.findIndex(
        (subtask) => subtask.id === Number(active.id)
      );
      const newIndex = subtasks.findIndex(
        (subtask) => subtask.id === Number(over.id)
      );

      // create a new array where the item at oldIndex has been moved to newIndex
      setSubtasks(arrayMove(subtasks, oldIndex, newIndex));
    }
  };

  const handleSave = () => {
    onSave({
      ...taskState!,
      subtasks: subtasks,
    });
  };

  return (
    <div className="z-30 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
        <h3 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "New Task"}
        </h3>
        <input
          type="text"
          value={taskState!.text}
          onChange={(e) =>
            setTaskState({ ...taskState!, text: e.target.value })
          }
          className="w-full px-3 py-2 mb-4 border rounded"
          placeholder="Task Name"
        />
        <textarea
          value={taskState!.description}
          onChange={(e) =>
            setTaskState({ ...taskState!, description: e.target.value })
          }
          className="w-full px-3 py-2 mb-4 border rounded"
          placeholder="Description"
        ></textarea>
        <DndContext
          sensors={sensors} // Listens for user input (click -> drag)
          collisionDetection={closestCenter} // uses closestCenter algorithm for collision handling
          onDragEnd={handleDragEnd} // Fires after a draggable item is dropped
        >
          <SortableContext
            items={subtasks.map((subtask) => subtask.id)} // Items with unique identifiers
            strategy={verticalListSortingStrategy} // sorting strategy optimized for vertical lists
          >
            {subtasks.map((subtask) => (
              <SortableItem
                task={subtask}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </SortableContext>
        </DndContext>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 mr-3 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
