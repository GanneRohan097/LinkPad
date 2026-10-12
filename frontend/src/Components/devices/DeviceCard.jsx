import { Laptop, MoreHorizontal, Smartphone, Tablet } from "lucide-react";

const icons = { laptop: Laptop, phone: Smartphone, tablet: Tablet };

function DeviceCard({ device, onRemove }) {
  const Icon = icons[device.icon] || Laptop;
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-600"><Icon size={21} strokeWidth={1.8} /></span><button aria-label={`Remove ${device.name}`} className="grid h-8 w-8 place-items-center text-slate-400 hover:text-rose-600" onClick={() => onRemove(device.name)} title="Remove device" type="button"><MoreHorizontal size={18} /></button></div>
      <div className="mt-4 flex items-center gap-2"><h2 className="text-sm font-semibold text-slate-900">{device.name}</h2><span className={`flex items-center gap-1.5 text-[11px] font-medium ${device.online ? "text-emerald-700" : "text-slate-500"}`}><span className={`h-1.5 w-1.5 rounded-full ${device.online ? "bg-emerald-500" : "bg-slate-400"}`} />{device.online ? "Online" : "Offline"}</span></div>
      <p className="mt-1 text-xs text-slate-500">{device.type}</p><div className="mt-4 border-t border-slate-100 pt-3"><p className="text-[11px] text-slate-400">Last active</p><p className="mt-1 text-xs font-medium text-slate-600">{device.active}</p></div>
    </article>
  );
}

export default DeviceCard;
