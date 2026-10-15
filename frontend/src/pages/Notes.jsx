
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import NoteCard from "../Components/notes/NoteCard";
import NoteEditor from "../Components/notes/NoteEditor";

//const API_URL = "http://localhost:5000/api/notes";
const API_URL = "https://linkpad-q82m.onrender.com/api/notes";;
function Notes() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All notes");
  const [sort, setSort] = useState("Recently updated");
  const [draft, setDraft] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in to view your notes.");
        }

        const response = await fetch(`${API_URL}/getNotes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.Message || "Failed to load notes"
          );
        }

        setItems(
          (data.notesList || data.Result || []).map((note) => ({
            ...note,
            pinned: note.is_pinned,
            updated: note.updated_at
              ? new Date(note.updated_at).toLocaleString()
              : "Just now",
            preview: note.content,
            color: "blue",
          }))
        );
      } catch (err) {
        setError(err.message || "Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const visibleNotes = useMemo(() => {
    let filtered = items.filter((note) =>
      `${note.title} ${note.content || ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    if (filter === "Pinned") {
      filtered = filtered.filter((note) => note.pinned);
    }

    if (sort === "Title A–Z") {
      return filtered
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "Oldest updated") {
      return filtered.slice().reverse();
    }

    return filtered;
  }, [items, query, filter, sort]);

  const startNewNote = () => {
    setError("");
    setDraft({
      title: "",
      content: "",
      pinned: false,
      color: "blue",
      updated: "Just now",
    });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    if (saving) return;
    setIsEditorOpen(false);
    setDraft(null);
  };

  const updateDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const saveNote = async () => {
    if (!draft || !draft.title.trim() || saving) return;

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to save your note.");
      }

      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: draft.title.trim(),
          content: draft.content,
          is_pinned: draft.pinned,
        }),
      });

      const data = await response.json();

      if (
        !response.ok ||
        data.Status === "Failed" ||
        data.success === false
      ) {
        throw new Error(
          data.Message || data.message || "Failed to create note"
        );
      }

      const savedNote = data.Result || data.note;

      if (!savedNote) {
        throw new Error(
          "The API did not return the created note. Check the backend response."
        );
      }

      setItems((current) => [
        {
          ...savedNote,
          pinned: savedNote.is_pinned,
          preview: savedNote.content,
          color: "blue",
          updated: savedNote.updated_at
            ? new Date(savedNote.updated_at).toLocaleString()
            : "Just now",
        },
        ...current,
      ]);

      setIsEditorOpen(false);
      setDraft(null);
    } catch (err) {
      setError(err.message || "Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const togglePin = (id) => {
    setItems((current) =>
      current.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const controlStyle =
    "h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[30px]">
            Notes
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Thoughts, lists, and ideas worth keeping.
          </p>
        </div>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          onClick={startNewNote}
          type="button"
        >
          <Plus size={17} />
          New note
        </button>
      </div>

      {/* Search, filter and sort */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_190px]">
        <div className="relative min-w-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            aria-label="Search notes"
            className={`${controlStyle} pl-9 pr-3`}
            placeholder="Search notes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <select
          aria-label="Filter notes"
          className={controlStyle}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option>All notes</option>
          <option>Pinned</option>
        </select>

        <select
          aria-label="Sort notes"
          className={controlStyle}
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option>Recently updated</option>
          <option>Oldest updated</option>
          <option>Title A–Z</option>
        </select>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {/* Notes grid */}
      {loading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading notes...
        </p>
      ) : visibleNotes.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onTogglePin={() => togglePin(note.id)}
              onDelete={() =>
                setItems((current) =>
                  current.filter((item) => item.id !== note.id)
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          {items.length
            ? "No notes match your search."
            : "No notes yet. Create your first note."}
        </div>
      )}

      {/* Information panel */}
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Your notes stay in sync
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Pick up where you left off from any connected device. Your pinned
          notes are always easy to find.
        </p>
      </div>

      {/* Responsive create-note modal */}
      {isEditorOpen && draft && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditor();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-editor-title"
            className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
              <div>
                <h2
                  id="note-editor-title"
                  className="text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl"
                >
                  Create a note
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Write down your thoughts and ideas.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditor}
                disabled={saving}
                aria-label="Close note editor"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <NoteEditor
                note={draft}
                onChange={updateDraft}
                onPin={() => updateDraft("pinned", !draft.pinned)}
                onSave={saveNote}
                onCancel={closeEditor}
              />

              {saving && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Saving note...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
