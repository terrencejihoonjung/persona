import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../../types/TaskTypes";

type SortableItemProps = {
  task: Task;
  handleCheckboxChange: (id: number, completed: boolean) => void;
};

function SortableItem({ task, handleCheckboxChange }: SortableItemProps) {
  // useSortable is an abstraction that composes of the useDraggable and useDroppable hooks
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Here, we directly call onCheckboxChange with the task's id and the new checked state.

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-3 mt-2 border-2 rounded-xl cursor-pointer w-full"
    >
      <input
        type="checkbox"
        id={`task-${task.id}`}
        className="w-5 h-5 mr-3"
        checked={task.completed}
        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
      />
      <label
        htmlFor={`task-${task.id}`}
        className="flex-1 text-md font-semibold"
      >
        {task.text}
      </label>
    </div>
  );
}

export default SortableItem;
