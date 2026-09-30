import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import Scribble from "../../../ui/Scribble.tsx";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function saveEdit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    onEdit(task.id, title);
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#F2D5A5] bg-[#FFFDF8] px-3 py-2.5 transition hover:border-[#F4B643]">
      <label className="flex shrink-0 cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} ${task.completed ? "incomplete" : "complete"}`}
          className="h-4 w-4 rounded border-[#F2D5A5] text-[#F4B643] focus:ring-[#F4B643]"
        />
      </label>

      {isEditing ? (
        <form onSubmit={saveEdit} className="flex min-w-0 flex-1 gap-1">
          <input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Edit task title" className="min-w-0 flex-1 rounded-md border border-[#F2D5A5] px-2 py-1 text-sm" />
          <button type="submit" aria-label="Save task" className="rounded-md p-1 text-green-700"><Save size={15} /></button>
          <button type="button" aria-label="Cancel editing" onClick={() => { setTitle(task.title); setIsEditing(false); }} className="rounded-md p-1 text-[#7B8790]"><X size={15} /></button>
        </form>
      ) : (
        <Scribble type="strike-through" color="#9E2B25" show={task.completed} className={`min-w-0 flex-1 break-words text-sm ${task.completed ? "text-[#8A8D95]" : "text-[#2D4C59]"}`}>
          {task.title}
        </Scribble>
      )}

      {!isEditing && (
        <button type="button" onClick={() => setIsEditing(true)} className="rounded-full p-1.5 text-[#7B8790] transition hover:bg-[#FBE7CC]" aria-label={`Edit ${task.title}`}>
          <Pencil size={14} />
        </button>
      )}

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