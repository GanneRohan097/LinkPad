
import { useState, useEffect } from "react";
import { HardDrive } from "lucide-react";
import QuickActions from "../Components/dashboard/QuickActions";
import RecentFiles from "../Components/dashboard/RecentFiles";
import ConnectedDevices from "../Components/dashboard/ConnectedDevices";
import PinnedNotes from "../Components/dashboard/PinnedNotes";
import RecentActivity from "../Components/dashboard/RecentActivity";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user.user.name;
  const token = localStorage.getItem("token");

  const [totalSize, setTotalSize] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [loadingStorage, setLoadingStorage] = useState(true);

  useEffect(() => {
    async function fetchStorage() {
      try {
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
        console.error("Failed to fetch storage:", error);
      } finally {
        setLoadingStorage(false);
      }
    }

    fetchStorage();
  }, [token]);

  function formatStorage(bytes) {
    if (bytes < 1000) return `${bytes} B`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(2)} KB`;
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(2)} MB`;
    return `${(bytes / 1000000000).toFixed(2)} GB`;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-700 dark:text-blue-400">
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              .replace(",", "")}
          </p>

          <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[30px]">
            {name}'s Workspace
          </h1>

          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Everything you need, right where you left it.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors dark:border-slate-700 dark:bg-slate-900 sm:self-auto">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
            <HardDrive size={19} />
          </span>

          <div className="min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              File storage used
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
              {loadingStorage ? "Loading..." : formatStorage(totalSize)}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {totalFiles} {totalFiles === 1 ? "file" : "files"} uploaded
            </p>
          </div>
        </div>
      </div>

      <QuickActions />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
        <div className="space-y-5">
          <RecentFiles />
          <PinnedNotes />
        </div>

        <div className="space-y-5">
          <ConnectedDevices />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
