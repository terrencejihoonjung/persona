import React, { useState } from "react";
// Define a type for our task
type Task = {
  id: number;
  text: string;
};

function TaskWidget() {
  // State to track the tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Go Shopping" },
    { id: 2, text: "Study" },
    { id: 3, text: "Eat" },
    { id: 4, text: "Sleep" },
  ]);

  // Function to handle the drag start event
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  // Function to handle the drop event
  const onDrop = (e: React.DragEvent<HTMLDivElement>, dropTaskId: number) => {
    const draggedTaskId = e.dataTransfer.getData("taskId");
    const draggedTask = tasks.find((task) => task.id === Number(draggedTaskId));
    const dropTaskIndex = tasks.findIndex((task) => task.id === dropTaskId);

    if (draggedTask) {
      const newTasks = tasks.filter(
        (task) => task.id !== Number(draggedTaskId)
      );
      newTasks.splice(dropTaskIndex, 0, draggedTask);
      setTasks(newTasks);
    }
  };

  // Function to handle the drag over event
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-start justify-start border rounded-2xl shadow-lg w-full h-full">
      <div className="px-5 py-4 border-b w-full">
        <h2 className="text-xl font-bold">Tasks</h2>
      </div>
      <div className="w-full px-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            onDrop={(e) => onDrop(e, task.id)}
            onDragOver={(e) => onDragOver(e)}
            className="flex items-center justify-between p-3 mt-2 border-2 rounded-xl cursor-move"
          >
            <input
              type="checkbox"
              id={`task-${task.id}`}
              className="w-5 h-5 mr-3"
            />
            <label
              htmlFor={`task-${task.id}`}
              className="flex-1 text-md font-semibold"
            >
              {task.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskWidget;
