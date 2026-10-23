
import { useState, useEffect } from "react";
import {
  CheckSquare,
  Files,
  HardDrive,
  LayoutDashboard,
  Link2,
  Settings,
  Smartphone,
  StickyNote,
} from "lucide-react";

const primaryLinks = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Files", icon: Files },
  { label: "Notes", icon: StickyNote },
  { label: "Tasks", icon: CheckSquare },
  { label: "Devices", icon: Smartphone },
  { label: "Settings", icon: Settings },
];

function Sidebar({ activePage, onNavigate }) {
  const [totalSize, setTotalSize] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [loadingStorage, setLoadingStorage] = useState(true);

  useEffect(() => {
    async function fetchStorage() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://linkpad-q82m.onrender.com/api/files/storage",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch storage");
        }

        setTotalSize(data.data.usedBytes);
        setTotalFiles(data.data.totalFiles);
      } catch (error) {
        console.error("Failed to fetch sidebar storage:", error);
      } finally {
        setLoadingStorage(false);
      }
    }

    fetchStorage();
  }, []);

  function formatStorage(bytes) {
    if (bytes < 1000) return `${bytes} B`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(2)} KB`;
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(2)} MB`;
    return `${(bytes / 1000000000).toFixed(2)} GB`;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 lg:flex">
      <div className="flex h-[68px] items-center gap-3 border-b border-slate-100 px-6 dark:border-slate-700">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white">
          <Link2 size={19} strokeWidth={2.4} />
        </div>
        <span className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          LinkPad
        </span>
      </div>

      <div className="px-4 pt-7">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          Workspace
        </p>

        <nav aria-label="Workspace" className="mt-3 space-y-1">
          {primaryLinks.map(({ label, icon: Icon }) => {
            const isActive = activePage === label;

            return (
              <button
                key={label}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
                onClick={() => onNavigate(label)}
                type="button"
              >
                <Icon size={18} strokeWidth={isActive ? 2.1 : 1.8} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-4 px-4 pb-5">
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <HardDrive
              size={16}
              className="text-blue-600 dark:text-blue-400"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
              File Storage
            </span>
          </div>

          <p className="mt-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {loadingStorage ? "Loading..." : formatStorage(totalSize)}
          </p>

          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Storage used
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {totalFiles} {totalFiles === 1 ? "file" : "files"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
