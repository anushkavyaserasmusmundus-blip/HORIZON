import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const TasksContext = createContext(null);

function readTasks(username) {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(`horizonTasks_${username}`) || "[]");
    if (!Array.isArray(storedTasks)) return [];
    return storedTasks.filter((task) => task && (typeof task.id === "string" || typeof task.id === "number") && typeof task.title === "string" && typeof task.completed === "boolean");
  } catch {
    return [];
  }
}

export function TasksProvider({ children }) {
  const { user } = useContext(AuthContext);
  const username = user?.username;
  const [taskLists, setTaskLists] = useState({});
  const tasks = useMemo(() => username ? taskLists[username] ?? readTasks(username) : [], [taskLists, username]);

  useEffect(() => {
    if (!username || !taskLists[username]) return;
    try {
      localStorage.setItem(`horizonTasks_${username}`, JSON.stringify(taskLists[username]));
    } catch {
      // Keep the in-memory task list usable when browser storage is unavailable.
    }
  }, [taskLists, username]);

  function updateTasks(transform) {
    if (!username) return;
    setTaskLists((current) => ({
      ...current,
      [username]: transform(current[username] ?? readTasks(username)),
    }));
  }

  function addTask(title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    updateTasks((current) => [{
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      title: trimmedTitle,
      completed: false,
      category: "Personal",
      priority: "Medium",
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString().slice(0, 10),
    }, ...current]);
  }

  function editTask(id, title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    updateTasks((current) => current.map((task) => task.id === id ? { ...task, title: trimmedTitle } : task));
  }

  function toggleTask(id) {
    updateTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id) {
    updateTasks((current) => current.filter((task) => task.id !== id));
  }

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    return (tasks.filter((task) => task.completed).length / tasks.length) * 100;
  }, [tasks]);

  return createElement(
    TasksContext.Provider,
    { value: { tasks, addTask, editTask, deleteTask, toggleTask, progress } },
    children,
  );
}

export default function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within TasksProvider");
  return context;
}