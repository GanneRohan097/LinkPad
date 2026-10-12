import { Check, FileUp, Smartphone, StickyNote } from "lucide-react";
import { activities } from "../../data/mockData";

const icons = { upload: FileUp, note: StickyNote, device: Smartphone, task: Check };

function RecentActivity() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-semibold text-slate-900">Recent activity</h2><p className="mt-0.5 text-xs text-slate-500">A little history from your workspace</p></div>
      <div className="px-5 py-1">
        {activities.map((activity, index) => {
          const Icon = icons[activity.kind];
          return <div key={activity.title} className="relative flex gap-3 py-3.5">{index < activities.length - 1 && <span className="absolute bottom-0 left-[15px] top-11 w-px bg-slate-100" />}<span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500"><Icon size={15} strokeWidth={1.8} /></span><div className="min-w-0 flex-1 pt-0.5"><p className="text-xs font-medium leading-5 text-slate-800">{activity.title}</p><p className="text-xs text-slate-500">{activity.detail}</p></div><span className="shrink-0 pt-1 text-[11px] text-slate-400">{activity.time}</span></div>;
        })}
      </div>
    </section>
  );
}

export default RecentActivity;
