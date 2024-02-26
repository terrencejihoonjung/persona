import { useState } from "react";
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
import SortableItem from "./SortableItem";
import { Task } from "../../../types/TaskTypes";

function TaskWidget() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Go Shopping", completed: false },
    { id: 2, text: "Study", completed: false },
    { id: 3, text: "Eat", completed: false },
    { id: 4, text: "Sleep", completed: false },
  ]);

  // Actively detects mouse clicks and or touch (finger click)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // Handles the re-ordering of tasks after a drag-drop action
  const handleDragEnd = (e: DragEndEvent) => {
    // active is the task being dragged, over is the task the active was dropped over
    const { active, over } = e;

    // If we dropped over a task and active and over are different tasks
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === Number(active.id));
      const newIndex = tasks.findIndex((task) => task.id === Number(over.id));

      // create a new array where the item at oldIndex has been moved to newIndex
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  // Creates a new array with updated check
  const handleCheckboxChange = (id: number, completed: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  return (
    <div className="flex flex-col items-start justify-start border rounded-2xl shadow-lg w-full h-full p-4">
      <div className="px-5 py-4 border-b w-full">
        <h2 className="text-xl font-bold">Tasks</h2>
      </div>

      {/* DndContext uses Context API to share data between draggable and droppable components and hooks */}
      <DndContext
        sensors={sensors} // Listens for user input (click -> drag)
        collisionDetection={closestCenter} // uses closestCenter algorithm for collision handling
        onDragEnd={handleDragEnd} // Fires after a draggable item is dropped.
      >
        {/* Sortable Context allows us to work with a sortable list of elements */}
        <SortableContext
          items={tasks.map((task) => task.id)} // Items with unique identifiers
          strategy={verticalListSortingStrategy} // sorting strategy optimized for vertical lists
        >
          {tasks.map((task) => (
            <SortableItem
              key={task.id}
              task={task}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default TaskWidget;
