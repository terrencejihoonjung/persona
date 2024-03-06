import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../../types/TaskTypes";

type SortableItemProps = {
  task: Task;
  handleCheckboxChange: (id: string, completed: boolean) => void;
  openEditModal?: (task: Task) => void;
  isDragging: boolean;
  handleSubtaskTextChange?: (id: string, newText: string) => void;
  handleSubtaskDelete?: (id: string) => void;
};

function SortableItem({
  task,
  handleCheckboxChange,
  openEditModal,
  isDragging,
  handleSubtaskTextChange,
  handleSubtaskDelete,
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
      className={`flex items-center justify-between mt-2 ${
        task.type === "task"
          ? "border-gray-400 border rounded-xl p-3 mt-2"
          : "p-2 mt-1"
      } w-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onClick={() => openEditModal && openEditModal(task as Task)}
    >
      <span className="flex items-center justify-between">
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
            onChange={(e) =>
              handleSubtaskTextChange &&
              handleSubtaskTextChange(task.id, e.target.value)
            }
            className="appearance-none outline-none text-md font-regular w-fit"
          />
        )}
      </span>

      {task.type === "subtask" && (
        <button
          onClick={() => handleSubtaskDelete && handleSubtaskDelete(task.id)}
        >
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
      )}
    </div>
  );
}

export default SortableItem;
