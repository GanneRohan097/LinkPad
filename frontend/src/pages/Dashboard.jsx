import { HardDrive } from "lucide-react";
import QuickActions from "../Components/dashboard/QuickActions";
import RecentFiles from "../Components/dashboard/RecentFiles";
import ConnectedDevices from "../Components/dashboard/ConnectedDevices";
import PinnedNotes from "../Components/dashboard/PinnedNotes";
import RecentActivity from "../Components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-700">
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              .replace(",", "")}
          </p>
          <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 sm:text-[30px]">
            Your Workspace
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Everything you need, right where you left it.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 sm:self-auto">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-blue-50 text-blue-700">
            <HardDrive size={15} />
          </span>
          <div>
            <p className="text-[11px] text-slate-500">Storage used</p>
            <p className="text-xs font-semibold text-slate-800">
              2.4 GB{" "}
              <span className="font-normal text-slate-400">of 10 GB</span>
            </p>
          </div>
          <div className="ml-3 h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[24%] rounded-full bg-blue-600" />
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
