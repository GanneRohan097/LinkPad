import { Laptop, MoreHorizontal, Smartphone } from "lucide-react";
import { devices } from "../../data/mockData";

function ConnectedDevices() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-start justify-between px-5 pb-2 pt-4">
        <div><h2 className="text-sm font-semibold text-slate-900">Connected devices</h2><p className="mt-0.5 text-xs text-slate-500">2 devices online</p></div>
        <button className="text-xs font-medium text-blue-700" type="button">Manage</button>
      </div>
      <div className="divide-y divide-slate-100">
        {devices.slice(0, 2).map((device) => {
          const Icon = device.icon === "laptop" ? Laptop : Smartphone;
          return <div key={device.name} className="flex items-center gap-3 px-5 py-3.5"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600"><Icon size={18} strokeWidth={1.8} /></span><div className="min-w-0 flex-1"><p className="text-[13px] font-medium text-slate-800">{device.name}</p><p className="mt-0.5 text-xs text-slate-500">{device.active}</p></div><span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Online</span><button aria-label="Device options" className="ml-1 grid h-8 w-8 place-items-center text-slate-400" type="button"><MoreHorizontal size={18} /></button></div>;
        })}
      </div>
    </section>
  );
}

export default ConnectedDevices;
