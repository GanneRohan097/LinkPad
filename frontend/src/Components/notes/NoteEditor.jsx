import { Pin, X } from "lucide-react";

function NoteEditor({ note, onChange, onPin, onSave, onCancel }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="space-y-4 p-5">
        <input
          aria-label="Note title"
          className="w-full border-0 border-b border-slate-100 bg-transparent pb-3 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300 focus:border-blue-500 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
          placeholder="Note title"
          value={note?.title || ""}
          onChange={(event) => onChange("title", event.target.value)}
        />

        <textarea
          aria-label="Note content"
          className="min-h-28 w-full resize-none border-0 bg-transparent text-sm leading-6 text-slate-600 outline-none placeholder:text-slate-300 dark:text-slate-300 dark:placeholder:text-slate-600"
          placeholder="Start writing..."
          value={note?.content || ""}
          onChange={(event) => onChange("content", event.target.value)}
        />

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            className={`inline-flex items-center gap-2 text-xs font-medium ${
              note?.pinned
                ? "text-blue-700 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-300"
            }`}
            onClick={onPin}
            type="button"
          >
            <Pin size={15} />
            {note?.pinned ? "Pinned" : "Pin note"}
          </button>

          <div className="flex gap-2">
            <button
              className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>

            <button
              className="h-9 rounded-lg bg-blue-600 px-4 text-xs font-medium text-white hover:bg-blue-700"
              onClick={onSave}
              type="button"
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoteEditor;