import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import NoteCard from "../Components/notes/NoteCard";
import NoteEditor from "../Components/notes/NoteEditor";
import { notes } from "../data/mockData";

function Notes() {
  const [items, setItems] = useState(notes.map((note) => ({ ...note, content: note.content || note.preview })));
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All notes");
  const [sort, setSort] = useState("Recently updated");
  const [draft, setDraft] = useState(null);
  const [editingTitle, setEditingTitle] = useState(null);
  const visibleNotes = useMemo(() => {
    let filtered = items.filter((note) => `${note.title} ${note.content}`.toLowerCase().includes(query.toLowerCase()));
    if (filter === "Pinned") filtered = filtered.filter((note) => note.pinned);
    if (sort === "Title A–Z") return filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Oldest updated") return filtered.slice().reverse();
    return filtered;
  }, [items, query, filter, sort]);
  const startNewNote = () => {
    setEditingTitle(null);
    setDraft({ title: "", content: "", pinned: false, color: "blue", updated: "Just now" });
  };
  const selectNote = (note) => {
    setEditingTitle(note.title);
    setDraft({ ...note });
  };
  const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const saveNote = () => {
    if (!draft || !draft.title.trim()) return;
    const saved = { ...draft, title: draft.title.trim(), preview: draft.content, updated: "Updated just now" };
    setItems((current) => editingTitle ? current.map((note) => note.title === editingTitle ? saved : note) : [saved, ...current]);
    setDraft(null);
    setEditingTitle(null);
  };
  const togglePin = (title) => setItems((current) => current.map((note) => note.title === title ? { ...note, pinned: !note.pinned } : note));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-[26px] font-semibold tracking-tight text-slate-900 sm:text-[30px]">Notes</h1><p className="mt-1.5 text-sm text-slate-500">Thoughts, lists, and ideas worth keeping.</p></div><button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white" onClick={startNewNote} type="button"><Plus size={17} />New note</button></div>
      <div className="flex flex-col gap-3 sm:flex-row"><div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input aria-label="Search notes" className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400" placeholder="Search notes" value={query} onChange={(event) => setQuery(event.target.value)} /></div><select aria-label="Filter notes" className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All notes</option><option>Pinned</option></select><select aria-label="Sort notes" className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600" value={sort} onChange={(event) => setSort(event.target.value)}><option>Recently updated</option><option>Oldest updated</option><option>Title A–Z</option></select></div>
      {visibleNotes.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visibleNotes.map((note) => <NoteCard key={note.title} note={note} onSelect={selectNote} onTogglePin={togglePin} onDelete={(titleToDelete) => setItems((current) => current.filter((item) => item.title !== titleToDelete))} />)}</div> : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No notes match your search.</div>}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]"><div className="rounded-xl border border-dashed border-slate-300 bg-white p-5"><p className="text-sm font-medium text-slate-700">Your notes stay in sync</p><p className="mt-1 text-sm leading-6 text-slate-500">Pick up where you left off from any connected device. Your pinned notes are always easy to find.</p></div>{draft ? <NoteEditor note={draft} onChange={updateDraft} onPin={() => updateDraft("pinned", !draft.pinned)} onSave={saveNote} onCancel={() => { setDraft(null); setEditingTitle(null); }} /> : <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-5 text-center text-sm text-slate-500">Select a note to edit, or create a new note.</div>}</div>
    </div>
  );
}

export default Notes;
