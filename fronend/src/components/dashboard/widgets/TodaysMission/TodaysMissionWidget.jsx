import { useState } from "react";
import Card from "../../../common/Card";
import AddTaskForm from "./AddTaskForm.jsx";
import ProgressBar from "./ProgressBar.jsx";
import TaskList from "./TaskList.jsx";
import useTasks from "../../../../hooks/useTasks";

export default function TodaysMissionWidget() {
  const { tasks, addTask, deleteTask, toggleTask, progress } = useTasks();
  const [showModal, setShowModal] = useState(false);

  const visibleTasks = tasks.slice(0, 3);

  return (
    <>
      <Card title="Today's Mission" className="h-full border-[#E8DCCF] bg-[#FFF8EF] p-5">
        <div className="space-y-3">
          <p className="text-sm text-[#5E6F78]">Keep your day focused and build momentum one task at a time.</p>

          <AddTaskForm onAdd={addTask} />

          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#F2D5A5] bg-[#FFFDF8] p-4 text-sm text-[#5E6F78]">
              No missions today ✨
              <div className="mt-1">Add your first mission</div>
            </div>
          ) : (
            <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
          )}

          {tasks.length > 3 && (
            <div className="mt-2">
              <button onClick={() => setShowModal(true)} className="text-[13px] font-semibold text-[#5E6F78] hover:text-[#2D4C59]">
                View more →
              </button>
            </div>
          )}

          <ProgressBar progress={progress} />
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2D4C59]">All Missions</h3>
              <button onClick={() => setShowModal(false)} className="text-sm text-[#5E6F78]">Close</button>
            </div>

            <div className="mt-4">
              <AddTaskForm onAdd={addTask} />
              <div className="mt-4">
                <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}