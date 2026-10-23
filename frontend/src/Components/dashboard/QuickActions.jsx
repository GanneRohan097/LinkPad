
import {
  ArrowUpFromLine,
  CheckSquare,
  FilePlus2,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Upload file",
    description: "Add something to your files",
    icon: ArrowUpFromLine,
    path: "/files",
  },
  {
    label: "Create note",
    description: "Capture an idea",
    icon: FilePlus2,
    path: "/notes",
  },
  {
    label: "Add task",
    description: "Keep track of what's next",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    label: "Your devices",
    description: "Check your all connected devices",
    icon: Smartphone,
    path: "/devices",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Quick actions
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {actions.map(({ label, description, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="group flex min-h-[86px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            type="button"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <Icon size={19} strokeWidth={1.9} />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">
                {label}
              </span>
              <span className="mt-1 block text-xs leading-4 text-slate-500 dark:text-slate-400">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
