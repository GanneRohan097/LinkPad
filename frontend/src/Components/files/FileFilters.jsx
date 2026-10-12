import { Grid2X2, List, Search } from "lucide-react";

function FileFilters({ search, onSearch, type, onType, sort, onSort, view, onView }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
        <input
          aria-label="Search files"
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base outline-none placeholder:text-slate-400"
          placeholder="Search files"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:flex">
        <select
          aria-label="Filter by file type"
          className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600"
          value={type}
          onChange={(event) => onType(event.target.value)}
        >
          <option>All file types</option>
          <option>PDF document</option>
          <option>Figma file</option>
          <option>Word document</option>
          <option>Archive</option>
          <option>Spreadsheet</option>
          <option>Image</option>
          <option>Other</option>
        </select>
        <select
          aria-label="Sort files"
          className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600"
          value={sort}
          onChange={(event) => onSort(event.target.value)}
        >
          <option>Recently added</option>
          <option>Name A–Z</option>
          <option>Name Z–A</option>
          <option>Largest first</option>
        </select>
      </div>

      <div className="hidden items-center rounded-xl border border-slate-200 p-1 sm:flex">
        <button
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          className={`grid h-10 w-10 place-items-center rounded-lg ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-400"}`}
          onClick={() => onView("grid")}
          type="button"
        >
          <Grid2X2 size={19} />
        </button>
        <button
          aria-label="List view"
          aria-pressed={view === "list"}
          className={`grid h-10 w-10 place-items-center rounded-lg ${view === "list" ? "bg-blue-50 text-blue-700" : "text-slate-400"}`}
          onClick={() => onView("list")}
          type="button"
        >
          <List size={19} />
        </button>
      </div>
    </div>
  );
}

export default FileFilters;