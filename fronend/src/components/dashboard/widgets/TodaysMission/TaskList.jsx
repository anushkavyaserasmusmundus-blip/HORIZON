import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks = [], onToggle, onDelete }) { 
    //props: tasks (array of task objects), onToggle (function to toggle task completion), onDelete (function to delete a task)
    //props drilling: tasks is an array of task objects, each with properties like id, title, completed, category, priority, createdAt, and dueDate. onToggle is a function that takes a task id and toggles its completion status. onDelete is a function that takes a task id and deletes the corresponding task from the list.

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
//TodaysWidget.jsx is the parent component that uses the TaskList component to display a list of tasks. 
//It passes down the tasks array, onToggle function, and onDelete function as props to the TaskList component. 
// The TaskList component then maps over the tasks array and renders a TaskItem component for each task, passing down the individual task object and the onToggle and onDelete functions as props to each TaskItem.
//parent holds mockitems in state. it passes tasks to tasklist. tasklist maps over tasks and passes each task to taskitem. taskitem renders the task and has buttons to toggle and delete the task. when those buttons are clicked, they call the onToggle and onDelete functions passed down from the parent, which update the state in the parent component.