import { Search } from "lucide-react";

function TaskFilters({ search, onSearch, status, onStatus, priority, onPriority }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input aria-label="Search tasks" className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400" placeholder="Search tasks" value={search} onChange={(event) => onSearch(event.target.value)} /></div>
      <div className="grid grid-cols-2 gap-2"><select aria-label="Filter by status" className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600" value={status} onChange={(event) => onStatus(event.target.value)}><option>All statuses</option><option>To do</option><option>In progress</option><option>Completed</option></select><select aria-label="Filter by priority" className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600" value={priority} onChange={(event) => onPriority(event.target.value)}><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select></div>
    </div>
  );
}

export default TaskFilters;
