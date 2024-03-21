import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../types/TaskTypes";

type DraggableListProps = {
  items: Task[];
  onDragEnd: (items: any[]) => void;
  children: (isDragging: boolean) => React.ReactNode;
};

export function DraggableList({
  items,
  onDragEnd,
  children,
}: DraggableListProps) {
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // pixels to drag before activating
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // milliseconds to wait before activating
        tolerance: 5, // pixels of movement allowed before activating
      },
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onDragEnd(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children(isDragging)}
      </SortableContext>
    </DndContext>
  );
}

export default DraggableList;
