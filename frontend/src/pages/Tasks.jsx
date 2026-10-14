import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "../Components/tasks/TaskCard";
import TaskFilters from "../Components/tasks/TaskFilters";
import { tasks } from "../data/mockData";

function Tasks() {
  const [items, setItems] = useState(tasks);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [priority, setPriority] = useState("All priorities");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const visibleTasks = useMemo(
    () =>
      items.filter((task) => {
        const taskStatus = task.completed ? "Completed" : task.status;

        return (
          task.title.toLowerCase().includes(search.toLowerCase()) &&
          (status === "All statuses" || taskStatus === status) &&
          (priority === "All priorities" || task.priority === priority)
        );
      }),
    [items, priority, search, status]
  );

  const addTask = (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    setItems((current) => [
      {
        title: title.trim(),
        status: "To do",
        due: due || "No date",
        priority: newPriority,
        completed: false,
      },
      ...current,
    ]);

    setTitle("");
    setDue("");
    setNewPriority("Medium");
    setShowForm(false);
  };

  const toggleTask = (taskTitle) =>
    setItems((current) =>
      current.map((task) =>
        task.title === taskTitle
          ? {
              ...task,
              completed: !task.completed,
              status: task.completed ? "To do" : "Completed",
            }
          : task
      )
    );

  const inputStyle =
    "h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[30px]">
            Tasks
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            A clear view of what's on your plate.
          </p>
        </div>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          onClick={() => setShowForm((visible) => !visible)}
          type="button"
        >
          <Plus size={17} />
          Add task
        </button>
      </div>

      {/* Add task form */}
      {showForm && (
        <form
          className="grid items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[minmax(0,1fr)_160px_140px_auto]"
          onSubmit={addTask}
        >
          <input
            autoFocus
            aria-label="Task title"
            className={inputStyle}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            value={title}
          />

          <input
            aria-label="Due date"
            className={inputStyle}
            onChange={(event) => setDue(event.target.value)}
            type="date"
            value={due}
          />

          <select
            aria-label="Task priority"
            className={inputStyle}
            onChange={(event) => setNewPriority(event.target.value)}
            value={newPriority}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
            type="submit"
          >
            Save task
          </button>
        </form>
      )}

      {/* Filters */}
      <TaskFilters
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
        priority={priority}
        onPriority={setPriority}
      />

      {/* Tasks list */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              All tasks
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {items.filter((task) => !task.completed).length} tasks to do ·{" "}
              {items.filter((task) => task.completed).length} completed
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {visibleTasks.length} shown
          </span>
        </div>

        <div className="hidden grid-cols-[24px_minmax(0,1fr)_120px_110px_80px_32px] gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-400 sm:grid">
          <span />
          <span>Task</span>
          <span>Status</span>
          <span>Due date</span>
          <span>Priority</span>
          <span />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {visibleTasks.length ? (
            visibleTasks.map((task) => (
              <TaskCard
                key={task.title}
                task={task}
                onToggle={toggleTask}
                onDelete={(titleToDelete) =>
                  setItems((current) =>
                    current.filter((item) => item.title !== titleToDelete)
                  )
                }
              />
            ))
          ) : (
            <p className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
              No tasks match these filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tasks;