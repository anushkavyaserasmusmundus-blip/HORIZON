import { Trash2 } from "lucide-react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#F2D5A5] bg-[#FFFDF8] px-3 py-2.5 transition hover:border-[#F4B643]">
      <label className="flex flex-1 cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-4 w-4 rounded border-[#F2D5A5] text-[#F4B643] focus:ring-[#F4B643]"
        />
        <span className={`text-sm ${task.completed ? "text-[#8A8D95] line-through" : "text-[#2D4C59]"}`}>
          {task.title}
        </span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="rounded-full p-1.5 text-[#C84D38] transition hover:bg-[#FBE7CC]"
        aria-label={`Delete ${task.title}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export { TaskItem as default };