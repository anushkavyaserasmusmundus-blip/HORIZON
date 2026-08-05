import { useMemo, useState } from "react";
import mockTasks from "../components/dashboard/widgets/TodaysMission/mockTasks";

export default function useTasks() {
  const [tasks, setTasks] = useState(mockTasks);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      category: "Personal",
      priority: "Medium",
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString().slice(0, 10),
    };

    setTasks((current) => [newTask, ...current]);
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    const completed = tasks.filter((task) => task.completed).length;
    return (completed / tasks.length) * 100;
  }, [tasks]);

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    progress,
  };
}

//hooks are used to encapsulate and manage stateful logic in React components. 
// In this case, the useTasks hook manages the state of tasks, providing functions to add, toggle, and delete tasks, as well as calculating the progress of completed tasks. 
// This allows for a clean separation of concerns and makes it easier to reuse the task management logic across different components.