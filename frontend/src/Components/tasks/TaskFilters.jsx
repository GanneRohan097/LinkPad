import { Search } from "lucide-react";

function TaskFilters({
  search,
  onSearch,
  status,
  onStatus,
  priority,
  onPriority,
}) {
  const controlStyle =
    "h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300";

  return (
    <div className="grid grid-cols-1 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[minmax(0,1fr)_180px_180px]">
      {/* Search */}
      <div className="relative min-w-0">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          aria-label="Search tasks"
          className={`${controlStyle} pl-9 pr-3`}
          placeholder="Search tasks"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>

      {/* Status filter */}
      <select
        aria-label="Filter by status"
        className={controlStyle}
        value={status}
        onChange={(event) => onStatus(event.target.value)}
      >
        <option>All statuses</option>
        <option>To do</option>
        <option>In progress</option>
        <option>Completed</option>
      </select>

      {/* Priority filter */}
      <select
        aria-label="Filter by priority"
        className={controlStyle}
        value={priority}
        onChange={(event) => onPriority(event.target.value)}
      >
        <option>All priorities</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>
  );
}

export default TaskFilters;