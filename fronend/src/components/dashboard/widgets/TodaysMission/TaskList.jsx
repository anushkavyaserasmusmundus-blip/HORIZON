import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks = [], onToggle, onDelete }) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}