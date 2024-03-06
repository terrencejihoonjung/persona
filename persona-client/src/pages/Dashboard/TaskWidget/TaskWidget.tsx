import { useState } from "react";
import DraggableList from "../../../components/ui/DraggableList";
import SortableItem from "./SortableItem";
import TaskModal from "./TaskModal";
import { Task } from "../../../types/TaskTypes";

function TaskWidget() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      text: "Go Shopping",
      description: "this is desc",
      completed: true,
      type: "task",
      subtasks: [
        {
          id: "subtask-1-1",
          text: "Get Bananas",
          completed: true,
          type: "subtask",
        },
        {
          id: "subtask-1-2",
          text: "Buy water",
          completed: true,
          type: "subtask",
        },
      ],
    },
    {
      id: "task-2",
      text: "Complete Homework",
      description: "Finish all assigned tasks for the week",
      completed: false,
      type: "task",
      subtasks: [
        {
          id: "subtask-2-1",
          text: "Math exercises",
          completed: true,
          type: "subtask",
        },
        {
          id: "subtask-2-2",
          text: "Science project",
          completed: true,
          type: "subtask",
        },
      ],
    },
    {
      id: "task-3",
      text: "House Cleaning",
      description: "General cleaning and organizing the house",
      completed: false,
      type: "task",
      subtasks: [
        {
          id: "subtask-3-1",
          text: "Vacuum living room",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-3-2",
          text: "Clean windows",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-3-3",
          text: "Organize bookshelf",
          completed: true,
          type: "subtask",
        },
      ],
    },
    {
      id: "task-4",
      text: "Prepare Dinner",
      description: "Cook a healthy meal for the family",
      completed: false,
      type: "task",
      subtasks: [
        {
          id: "subtask-4-1",
          text: "Chop vegetables",
          completed: true,
          type: "subtask",
        },
        {
          id: "subtask-4-2",
          text: "Marinate chicken",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-4-3",
          text: "Set the table",
          completed: false,
          type: "subtask",
        },
      ],
    },
    {
      id: "task-5",
      text: "Morning Routine",
      description: "Start the day with productive habits",
      completed: false,
      type: "task",
      subtasks: [
        {
          id: "subtask-5-1",
          text: "Meditation",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-5-2",
          text: "Journaling",
          completed: true,
          type: "subtask",
        },
        {
          id: "subtask-5-3",
          text: "Exercise",
          completed: false,
          type: "subtask",
        },
      ],
    },
    {
      id: "task-6",
      text: "Office Work",
      description: "Complete daily work assignments",
      completed: false,
      type: "task",
      subtasks: [
        {
          id: "subtask-6-1",
          text: "Check emails",
          completed: true,
          type: "subtask",
        },
        {
          id: "subtask-6-2",
          text: "Team meeting",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-6-3",
          text: "Project development",
          completed: false,
          type: "subtask",
        },
      ],
    },
    {
      id: "task-7",
      text: "Learning Guitar",
      description: "Practice guitar for 30 minutes",
      completed: false,
      type: "task",
      subtasks: [
        {
          id: "subtask-7-1",
          text: "Tuning",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-7-2",
          text: "Scale practice",
          completed: false,
          type: "subtask",
        },
        {
          id: "subtask-7-3",
          text: "Learn new song",
          completed: false,
          type: "subtask",
        },
      ],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>({} as Task);

  const openEditModal = (task: Task) => {
    setEditingTask(task); // Set the task to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleAddNewTask = () => {
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
  };

  const handleSaveTask = (savedTask: Task) => {
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
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleExitModal = () => {
    setEditingTask({} as Task);
    setIsModalOpen(false); // Close the modal
  };

  // Creates a new array with updated check
  const handleCheckboxChange = (id: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  return (
    <div className="flex flex-col items-start justify-start border rounded-2xl shadow-lg w-full h-full overflow-hidden">
      <div className="pl-4 pt-4 pb-2 border-b w-full">
        <h2 className="text-xl font-bold">Tasks</h2>
      </div>

      <div
        className="w-full px-4 text-center text-sm font-semibold text-black border-gray-200 border border-t-0 rounded-b-md cursor-pointer hover:bg-black hover:text-white hover:p-3 hover:rounded-b-xl transition-all duration-200 ease-in-out"
        onClick={handleAddNewTask}
      >
        Add Task
      </div>

      {/* DndContext uses Context API to share data between draggable and droppable components and hooks */}
      <div className="w-full px-4 overflow-x-hidden overflow-y-auto pb-2">
        <DraggableList items={tasks} onDragEnd={setTasks}>
          {(isDragging) => (
            <>
              {tasks.map((task) => (
                <SortableItem
                  key={task.id}
                  task={task}
                  isDragging={isDragging}
                  openEditModal={openEditModal}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}
            </>
          )}
        </DraggableList>
      </div>
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onExit={handleExitModal}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default TaskWidget;
