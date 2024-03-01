import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, SubTask } from "../../../types/TaskTypes";

type SortableItemProps = {
  task: Task | SubTask;
  handleCheckboxChange: (id: number, completed: boolean) => void;
};

function SortableItem({ task, handleCheckboxChange }: SortableItemProps) {
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
      className="flex items-center justify-start p-3 mt-2 border-2 rounded-xl w-full"
    >
      <input
        type="checkbox"
        id={`task-${task.id}`}
        className="w-5 h-5 mr-3"
        checked={task.completed}
        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
      />
      <p className="flex text-md font-semibold">{task.text}</p>
    </div>
  );
}

export default SortableItem;
