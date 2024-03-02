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

  const style = {
    // Need to convert transform object into CSS transform string
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-start p-3 mt-2 border-gray-400 border rounded-xl w-full ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onClick={() => openEditModal && openEditModal(task as Task)}
    >
      <input
        type="checkbox"
        id={task.id}
        className="w-5 h-5 mr-3"
        checked={task.completed}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
      />
      <p className="flex text-md font-semibold w-full">{task.text}</p>
    </div>
  );
}

export default SortableItem;
