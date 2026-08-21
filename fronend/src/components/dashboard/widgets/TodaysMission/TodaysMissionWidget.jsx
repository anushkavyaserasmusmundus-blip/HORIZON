import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ClipboardList, X } from "lucide-react";
import AddTaskForm from "./AddTaskForm.jsx";
import ProgressBar from "./ProgressBar.jsx";
import TaskList from "./TaskList.jsx";
import useTasks from "../../../../hooks/useTasks";

export default function TodaysMissionWidget() {
  const { tasks, addTask, deleteTask, toggleTask, progress } = useTasks();
  const [open, setOpen] = useState(false);
  // track drag so a drag gesture never triggers open
  const didDrag = useRef(false);

  return (
    <>
      {/* Draggable floating trigger — double-click to open */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        whileDrag={{ scale: 1.05 }}
        onDragStart={() => { didDrag.current = true; }}
        onDragEnd={() => { setTimeout(() => { didDrag.current = false; }, 100); }}
        className="fixed bottom-6 right-6 z-40 cursor-grab active:cursor-grabbing"
      >
        <button
          onDoubleClick={() => { if (!didDrag.current) setOpen(true); }}
          className="flex items-center gap-2 rounded-2xl border border-[#F2D5A5] bg-[#FFF8EF] px-5 py-3 shadow-lg transition hover:shadow-xl select-none"
        >
          <ClipboardList size={18} className="text-[#C84D38]" />
          <span className="text-sm font-semibold text-[#2D4C59]">To Do List</span>
          {tasks.filter((t) => !t.done).length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C84D38] text-[10px] font-bold text-white">
              {tasks.filter((t) => !t.done).length}
            </span>
          )}
        </button>
      </motion.div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-lg rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-6 shadow-2xl">

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList size={20} className="text-[#C84D38]" />
                <h3 className="text-lg font-bold text-[#2D4C59]">To Do List</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5E6F78] transition hover:bg-[#FBE7CC] hover:text-[#2D4C59]"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mb-4 text-sm text-[#5E6F78]">Keep your day focused and build momentum one task at a time.</p>

            <AddTaskForm onAdd={addTask} />

            <div className="mt-4">
              {tasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#F2D5A5] bg-white p-4 text-sm text-[#5E6F78]">
                  No tasks yet ✨
                  <div className="mt-1">Add your first task above</div>
                </div>
              ) : (
                <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
              )}
            </div>

            <div className="mt-4">
              <ProgressBar progress={progress} />
            </div>

          </div>
        </div>
      )}
    </>
  );
}