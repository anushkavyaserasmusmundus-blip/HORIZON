import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) return;

    onAdd(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a mission"
        className="flex-1 rounded-xl border border-[#F2D5A5] bg-[#FFFDF8] px-3 py-2 text-sm text-[#2D4C59] outline-none ring-0"
      />
      <button
        type="submit"
        className="rounded-xl bg-[#F4B643] px-3 py-2 text-sm font-semibold text-[#2D4C59] transition hover:bg-[#e9a92f]"
      >
        Add
      </button>
    </form>
  );
}
