
import {
  ArrowDownToLine,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { files } from "../../data/mockData";

const fileIcons = {
  pdf: FileText,
  figma: FileImage,
  word: FileText,
  zip: FileArchive,
  sheet: FileSpreadsheet,
};

const iconStyles = {
  pdf: "bg-rose-50 text-rose-600",
  figma: "bg-violet-50 text-violet-600",
  word: "bg-blue-50 text-blue-600",
  zip: "bg-amber-50 text-amber-600",
  sheet: "bg-emerald-50 text-emerald-600",
};

function RecentFiles() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Recent files
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Your latest additions
          </p>
        </div>
        <button className="text-xs font-medium text-blue-700 dark:text-blue-400" type="button">
          View all
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {files.slice(0, 4).map((file) => {
          const Icon = fileIcons[file.kind];

          return (
            <div
              key={file.name}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${iconStyles[file.kind]}`}>
                <Icon size={18} strokeWidth={1.8} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">
                  {file.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {file.type}{" "}
                  <span className="px-1 text-slate-300 dark:text-slate-600">·</span>
                  {file.size}
                </p>
              </div>

              <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                {file.time}
              </span>

              <button
                aria-label="File options"
                className="ml-1 grid h-8 w-8 shrink-0 place-items-center rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                type="button"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-700">
        <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ArrowDownToLine size={14} />
          Files sync across your connected devices
        </span>
      </div>
    </section>
  );
}

export default RecentFiles;
