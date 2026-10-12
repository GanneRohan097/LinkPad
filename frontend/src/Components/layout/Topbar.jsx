import { Bell, Search } from "lucide-react";

function Topbar({ context = "Dashboard" }) {
  const user = JSON.parse(localStorage.getItem("user"))
   const name = user.user.name
   console.log(name)
   const firstName = name[0];
  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
      <div className="hidden min-w-0 flex-1 items-center gap-2 text-sm text-slate-500 sm:flex">
        <span className="font-medium text-slate-800">Workspace</span><span className="text-slate-300">/</span><span>{context}</span>
      </div>

      <div className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-5 sm:flex">
        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-l font-semibold text-blue-700">{firstName}</div>
          <div className="hidden xl:block"><p className="text-sm font-medium leading-5 text-slate-800">{name}</p><p className="text-xs leading-4 text-slate-500">Personal workspace</p></div>
        </div>
      </div>
      <div className="ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 sm:hidden">{firstName}</div>
    </header>
  );
}

export default Topbar;
