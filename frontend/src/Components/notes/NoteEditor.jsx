import { Pin, X } from "lucide-react";

function NoteEditor({ note, onChange, onPin, onSave, onCancel }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-sm font-semibold text-slate-900">{note ? "Edit note" : "New note"}</h2><p className="mt-0.5 text-xs text-slate-500">Changes are saved in this browser session.</p></div><button aria-label="Close editor" className="grid h-8 w-8 place-items-center rounded-md text-slate-400" onClick={onCancel} type="button"><X size={17} /></button></div>
      <div className="space-y-4 p-5"><input aria-label="Note title" className="w-full border-0 border-b border-slate-100 bg-transparent pb-3 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300" placeholder="Note title" value={note?.title || ""} onChange={(event) => onChange("title", event.target.value)} /><textarea aria-label="Note content" className="min-h-28 w-full resize-none border-0 bg-transparent text-sm leading-6 text-slate-600 outline-none placeholder:text-slate-300" placeholder="Start writing..." value={note?.content || ""} onChange={(event) => onChange("content", event.target.value)} /><div className="flex items-center justify-between border-t border-slate-100 pt-4"><button className={`inline-flex items-center gap-2 text-xs font-medium ${note?.pinned ? "text-blue-700" : "text-slate-600"}`} onClick={onPin} type="button"><Pin size={15} />{note?.pinned ? "Pinned" : "Pin note"}</button><div className="flex gap-2"><button className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600" onClick={onCancel} type="button">Cancel</button><button className="h-9 rounded-lg bg-blue-600 px-4 text-xs font-medium text-white" onClick={onSave} type="button">Save note</button></div></div></div>
    </section>
  );
}

export default NoteEditor;
