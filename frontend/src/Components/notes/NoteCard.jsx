import { Pin, Trash2 } from "lucide-react";

const colors = {
  blue: "border-l-blue-500",
  amber: "border-l-amber-500",
  green: "border-l-emerald-500",
};

function NoteCard({ note, onSelect, onTogglePin, onDelete }) {
  return (
    <article
      className={`min-h-[190px] rounded-xl border border-slate-200 border-l-[3px] bg-white p-5 transition-colors dark:border-slate-800 dark:bg-slate-900 ${
        colors[note.color] || colors.blue
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          className="flex-1 text-left text-sm font-semibold leading-5 text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
          onClick={() => onSelect(note)}
          type="button"
        >
          {note.title}
        </button>

        <button
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          className={`shrink-0 ${
            note.pinned
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
          onClick={() => onTogglePin(note.title)}
          type="button"
        >
          <Pin size={15} />
        </button>

        <button
          aria-label={`Delete ${note.title}`}
          className="shrink-0 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
          onClick={() => onDelete(note.title)}
          type="button"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <button
        className="mt-3 block w-full text-left"
        onClick={() => onSelect(note)}
        type="button"
      >
        <p className="line-clamp-4 text-[13px] leading-6 text-slate-600 dark:text-slate-300">
          {note.content || note.preview}
        </p>
      </button>

      <p className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
        {note.updated}
      </p>
    </article>
  );
}

export default NoteCard;