import { Trash2 } from "lucide-react";

const priorityStyles = { High: "bg-rose-50 text-rose-700", Medium: "bg-amber-50 text-amber-700", Low: "bg-slate-100 text-slate-600" };

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`grid grid-cols-[24px_minmax(0,1fr)_auto_32px] items-center gap-3 px-4 py-4 sm:grid-cols-[24px_minmax(0,1fr)_120px_110px_80px_32px] sm:px-5 ${task.completed ? "bg-slate-50/60" : "bg-white"}`}>
      <input aria-label={`${task.completed ? "Completed" : "Pending"}: ${task.title}`} checked={task.completed} className="h-4 w-4 rounded border-slate-300 accent-blue-600" onChange={() => onToggle(task.title)} type="checkbox" />
      <div className="min-w-0"><p className={`truncate text-sm font-medium ${task.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>{task.title}</p><p className="mt-1 text-xs text-slate-500 sm:hidden">{task.status} <span className="px-1 text-slate-300">·</span> Due {task.due}</p></div>
      <span className={`hidden w-fit rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${task.completed ? "bg-slate-100 text-slate-500" : task.status === "In progress" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{task.status}</span>
      <span className="hidden text-xs text-slate-600 sm:block">{task.due}</span>
      <span className={`hidden w-fit rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${priorityStyles[task.priority]}`}>{task.priority}</span>
      <button aria-label={`Delete ${task.title}`} className="grid h-8 w-8 place-items-center text-slate-400 hover:text-rose-600" onClick={() => onDelete(task.title)} title="Delete task" type="button"><Trash2 size={16} /></button>
    </div>
  );
}

export default TaskCard;
