import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../../types/TaskTypes";

type SortableItemProps = {
  task: Task;
  handleCheckboxChange: (id: string, completed: boolean) => void;
  openEditModal?: (task: Task) => void;
  isDragging: boolean;
};

function SortableItem({
  task,
  handleCheckboxChange,
  openEditModal,
  isDragging,
}: SortableItemProps) {
  // useSortable is an abstraction that composes of the useDraggable and useDroppable hooks
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const transformStyle = {
    // Need to convert transform object into CSS transform string
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={transformStyle}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-start mt-2 ${
        task.type === "task"
          ? "border-gray-400 border rounded-xl p-3 mt-2"
          : "p-2 mt-1"
      } w-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onClick={() => openEditModal && openEditModal(task as Task)}
    >
      {task.type === "subtask" && (
        <button className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
      )}
      <input
        type="checkbox"
        id={task.id}
        className="w-5 h-5 mr-3"
        checked={task.completed}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
      />
      {task.type === "task" ? (
        <p className="flex text-md font-semibold w-full">{task.text}</p>
      ) : (
        <input
          value={task.text}
          type="text"
          className="appearance-none outline-none text-md font-regular w-fit"
        />
      )}
    </div>
  );
}

export default SortableItem;
