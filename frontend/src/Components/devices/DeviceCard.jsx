import { Laptop, MoreHorizontal, Smartphone, Tablet } from "lucide-react";

const icons = { laptop: Laptop, phone: Smartphone, tablet: Tablet };

function DeviceCard({ device, onRemove }) {
  const Icon = icons[device.icon] || Laptop;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Icon size={21} strokeWidth={1.8} />
        </span>


      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {device.name}
        </h2>

      </div>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {device.type}
      </p>

      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Last active
        </p>
        <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          {device.active}
        </p>
      </div>
    </article>
  );
}

export default DeviceCard;