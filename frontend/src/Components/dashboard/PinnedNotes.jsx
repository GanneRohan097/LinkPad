
import { ArrowUpRight, Pin } from "lucide-react";
import { notes } from "../../data/mockData";

const dotStyles = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  green: "bg-emerald-500",
};

function PinnedNotes() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Pinned notes
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            A few things to keep close
          </p>
        </div>

        <button
          aria-label="View all notes"
          className="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          type="button"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {notes.map((note) => (
          <article key={note.title} className="px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${dotStyles[note.color]}`} />

              <h3 className="flex-1 truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">
                {note.title}
              </h3>

              {note.pinned && (
                <Pin size={13} className="shrink-0 text-slate-400 dark:text-slate-500" />
              )}
            </div>

            <p className="mt-1.5 line-clamp-2 pl-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {note.preview}
            </p>

            <p className="mt-2 pl-4 text-[11px] text-slate-400 dark:text-slate-500">
              {note.updated}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PinnedNotes;
