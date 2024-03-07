import DraggableList from "../../../components/ui/DraggableList";
import SortableItem from "./SortableItem";
import TaskModal from "./TaskModal";
import useTaskWidget from "../../../hooks/useTaskWidget";

function TaskWidget() {
  const {
    tasks,
    setTasks,
    isModalOpen,
    editingTask,
    openEditModal,
    handleAddNewTask,
    handleSaveTask,
    handleDeleteTask,
    handleExitModal,
    handleCheckboxChange,
  } = useTaskWidget();

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
