
import {
  CheckSquare,
  Files,
  LayoutDashboard,
  Settings,
  StickyNote,
  Smartphone,
} from "lucide-react";

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
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-slate-200 bg-white px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 transition-colors dark:border-slate-700 dark:bg-slate-900 lg:hidden"
    >
      {items.map(({ label, icon: Icon }) => {
        const isActive = activePage === label;

        return (
          <button
            key={label}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-12 flex-col items-center justify-center gap-1 text-[9px] font-medium transition-colors sm:text-[10px] ${
              isActive
                ? "text-blue-700 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => onNavigate(label)}
            type="button"
          >
            <Icon size={25} strokeWidth={isActive ? 2.2 : 1.8} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export default MobileNavbar;
