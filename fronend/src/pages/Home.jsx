import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays, Check, Plus, Trash2, X } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import TodaysMissionWidget from "../components/dashboard/widgets/TodaysMission/TodaysMissionWidget";

const ACCENT = "#FFB800";
const initialDate = "2026-08-18";

const initialTasks = {
  [initialDate]: [{ id: 1, time: "09:00", title: "Solve LeetCode Daily", done: false }],
};

function Card({ children, className = "" }) {
  return <section className={`rounded-2xl border border-[#E8DCCF] bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${className}`}>{children}</section>;
}

function CalendarCard({ selectedDate, setSelectedDate, tasks }) {
  function handleDateChange(date) {
    setSelectedDate(date.toISOString().slice(0, 10));
  }

  return (
    <Card>
      <div className="flex items-center gap-2"><CalendarDays size={16} style={{ color: ACCENT }} /><h2 className="text-sm font-semibold text-[#2D4C59]">Calendar</h2></div>
      <Calendar
        value={new Date(`${selectedDate}T12:00:00`)}
        onChange={handleDateChange}
        onClickDay={handleDateChange}
        tileClassName={({ date }) => date.toISOString().slice(0, 10) === selectedDate ? "home-calendar-active" : ""}
        tileContent={({ date, view }) => view === "month" && tasks[date.toISOString().slice(0, 10)]?.length ? <span className="home-calendar-dot" /> : null}
        className="home-calendar mt-3 w-full border-0 text-sm"
      />
    </Card>
  );
}

function RemindersCard({ selectedDate, tasks, setTasks }) {
  const [showDialog, setShowDialog] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", time: "09:00" });
  const reminders = tasks[selectedDate] || [];
  const displayDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  function addReminder(event) {
    event.preventDefault();
    if (!newReminder.title.trim()) return;
    setTasks((current) => ({ ...current, [selectedDate]: [...(current[selectedDate] || []), { id: Date.now(), ...newReminder, done: false }] }));
    setNewReminder({ title: "", time: "09:00" });
    setShowDialog(false);
  }

  function updateReminder(id, changes) {
    setTasks((current) => ({ ...current, [selectedDate]: current[selectedDate].map((reminder) => reminder.id === id ? { ...reminder, ...changes } : reminder) }));
  }

  function removeReminder(id) {
    setTasks((current) => ({ ...current, [selectedDate]: current[selectedDate].filter((reminder) => reminder.id !== id) }));
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3"><h2 className="text-sm font-semibold text-[#2D4C59]">Reminders for {displayDate}</h2><button type="button" onClick={() => setShowDialog(true)} className="inline-flex items-center gap-1 rounded-lg bg-[#FFB800] px-2.5 py-1.5 text-xs font-semibold text-[#2D4C59]"><Plus size={16} /> Add</button></div>
      <div className="mt-3 space-y-2">
        {reminders.length ? reminders.map((reminder) => <div key={reminder.id} className="flex items-center gap-2 rounded-xl bg-[#FFF8EF] px-3 py-2.5"><button type="button" onClick={() => updateReminder(reminder.id, { done: !reminder.done })} aria-label={`Mark ${reminder.title} ${reminder.done ? "incomplete" : "complete"}`} className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${reminder.done ? "border-[#FFB800] bg-[#FFB800]" : "border-[#D1C4B0]"}`}>{reminder.done && <Check size={12} />}</button><span className="text-sm text-[#7B8790]">{reminder.time}</span><span className={`min-w-0 flex-1 text-sm ${reminder.done ? "text-[#9CA3AF] line-through" : "text-[#2D4C59]"}`}>{reminder.title}</span><button type="button" onClick={() => removeReminder(reminder.id)} aria-label={`Delete ${reminder.title}`} className="text-[#9CA3AF] hover:text-[#C84D38]"><Trash2 size={14} /></button></div>) : <p className="py-5 text-center text-sm text-[#7B8790]">No reminders for {displayDate}. Add one.</p>}
      </div>
      {showDialog && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D4C59]/30 p-4"><form onSubmit={addReminder} className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-[#2D4C59]">Add Reminder</h3><button type="button" onClick={() => setShowDialog(false)} aria-label="Close dialog"><X size={16} /></button></div><label className="mt-4 block text-sm font-medium text-[#2D4C59]">Title<input value={newReminder.title} onChange={(event) => setNewReminder({ ...newReminder, title: event.target.value })} className="mt-1 w-full rounded-lg border border-[#E8DCCF] px-3 py-2 text-sm outline-none focus:border-[#FFB800]" autoFocus /></label><label className="mt-3 block text-sm font-medium text-[#2D4C59]">Time<input type="time" value={newReminder.time} onChange={(event) => setNewReminder({ ...newReminder, time: event.target.value })} className="mt-1 w-full rounded-lg border border-[#E8DCCF] px-3 py-2 text-sm outline-none focus:border-[#FFB800]" /></label><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setShowDialog(false)} className="rounded-lg border border-[#E8DCCF] px-3 py-2 text-sm">Cancel</button><button type="submit" className="rounded-lg bg-[#FFB800] px-3 py-2 text-sm font-semibold">Save</button></div></form></div>}
    </Card>
  );
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1100px] space-y-4">
        <section className="home-intro relative overflow-hidden rounded-[2rem] border border-[#F7B39B] bg-[#FFFDF8] px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <div className="home-intro-sun" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F4512A]">Your personal operating system</p>
            <h1 className="home-display mt-3 max-w-xl text-4xl font-black leading-[0.96] text-[#9E2F1C] sm:text-6xl">Make progress visible<span className="text-[#F36B91]">.</span></h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#9E5B4D]">A brighter place to collect your next move, keep promises to yourself, and turn small actions into momentum.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#F4512A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">Today, on purpose</span>
              <span className="text-xs font-semibold text-[#D16A54]">Plan · Practice · Progress</span>
            </div>
          </div>
          <div className="home-intro-burst" aria-hidden="true">✳</div>
          <div className="home-intro-orbit" aria-hidden="true" />
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <CalendarCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} tasks={tasks} />
            <RemindersCard selectedDate={selectedDate} tasks={tasks} setTasks={setTasks} />
          </div>
          <section className="home-story relative overflow-hidden rounded-[2rem] bg-[#F4512A] p-6 text-white shadow-sm sm:p-8">
            <div className="home-story-shape" aria-hidden="true" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFE0C2]">How Horizon works</p>
              <h2 className="home-display mt-3 max-w-sm text-3xl font-black leading-tight sm:text-4xl">One place for the life you&apos;re building.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#FFF1E7]">Turn goals into reminders, practice into proof, and everyday effort into a story you can actually see.</p>
              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/30 pt-4 text-center">
                <div><p className="text-2xl font-black">01</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#FFE0C2]">Focus</p></div>
                <div><p className="text-2xl font-black">02</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#FFE0C2]">Practice</p></div>
                <div><p className="text-2xl font-black">03</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#FFE0C2]">Grow</p></div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <TodaysMissionWidget />
    </DashboardLayout>
  );
}
