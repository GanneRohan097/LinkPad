import { CheckSquare, Files, LayoutDashboard, Link2, Settings, Smartphone, StickyNote } from "lucide-react";

const primaryLinks = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Files", icon: Files },
  { label: "Notes", icon: StickyNote },
  { label: "Tasks", icon: CheckSquare },
  { label: "Devices", icon: Smartphone },
  { label: "Settings", icon: Settings },
];

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-[68px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white"><Link2 size={19} strokeWidth={2.4} /></div>
        <span className="text-[17px] font-semibold tracking-tight text-slate-900">LinkPad</span>
      </div>
      <div className="px-4 pt-7">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Workspace</p>
        <nav aria-label="Workspace" className="mt-3 space-y-1">
          {primaryLinks.map(({ label, icon: Icon }) => (
            <button key={label} aria-current={activePage === label ? "page" : undefined} className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium ${activePage === label ? "bg-blue-50 text-blue-700" : "text-slate-600"}`} onClick={() => onNavigate(label)} type="button">
              <Icon size={18} strokeWidth={activePage === label ? 2.1 : 1.8} />{label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto space-y-4 px-4 pb-5">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">Storage</span>
            <span className="text-xs text-slate-500">2.4 / 10 GB</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[24%] rounded-full bg-blue-600" /></div>
          <p className="mt-2 text-[11px] text-slate-500">7.6 GB available</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
