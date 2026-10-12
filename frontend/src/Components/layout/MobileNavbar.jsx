import { CheckSquare, Files, LayoutDashboard, Settings, StickyNote, Smartphone } from "lucide-react";

const items = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Files", icon: Files },
  { label: "Notes", icon: StickyNote },
  { label: "Tasks", icon: CheckSquare },
  { label: "Devices", icon: Smartphone },
  { label: "Settings", icon: Settings },
];

function MobileNavbar({ activePage, onNavigate }) {
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-slate-200 bg-white px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 lg:hidden">
      {items.map(({ label, icon: Icon }) => (
        <button key={label} aria-current={activePage === label ? "page" : undefined} className={`flex min-h-12 flex-col items-center justify-center gap-1 text-[9px] font-medium sm:text-[10px] ${activePage === label ? "text-blue-700" : "text-slate-500"}`} onClick={() => onNavigate(label)} type="button">
          <Icon size={18} strokeWidth={activePage === label ? 2.2 : 1.8} />{label}
        </button>
      ))}
    </nav>
  );
}

export default MobileNavbar;
