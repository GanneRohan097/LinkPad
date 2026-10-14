import {
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Trash2,
  Download,
} from "lucide-react";

const fileIcons = {
  pdf: FileText,
  figma: FileImage,
  word: FileText,
  zip: FileArchive,
  sheet: FileSpreadsheet,
};

function FileList({ files, onRemove, onDownload }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="hidden grid-cols-[minmax(240px,1.5fr)_1fr_1fr_1fr_88px] gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-400 sm:grid">
        <span>Name</span>
        <span>File size</span>
        <span>Uploaded</span>
        <span>Source device</span>
        <span>Actions</span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {files.map((file) => {
          const Icon = fileIcons[file.kind] || FileText;

          return (
            <div
              key={file.id}
              className="grid grid-cols-[minmax(0,1fr)_80px] items-center gap-2 px-5 py-5 sm:grid-cols-[minmax(240px,1.5fr)_1fr_1fr_1fr_88px] sm:gap-4 sm:px-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Icon size={22} />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-slate-800 dark:text-slate-100">
                    {file.name}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 sm:hidden">
                    {file.size} · {file.time}
                  </p>
                  <p className="mt-0.5 hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                    {file.type}
                  </p>
                </div>
              </div>

              <span className="hidden text-sm text-slate-600 dark:text-slate-300 sm:block">
                {file.size}
              </span>

              <span className="hidden text-sm text-slate-600 dark:text-slate-300 sm:block">
                {file.time}
              </span>

              <span className="hidden truncate text-sm text-slate-600 dark:text-slate-300 sm:block">
                {file.source}
              </span>

              <div className="flex items-center justify-end gap-1">
                <button
                  aria-label={`Download ${file.name}`}
                  className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                  onClick={() => onDownload(file)}
                  title="Download file"
                  type="button"
                >
                  <Download size={19} />
                </button>

                <button
                  aria-label={`Remove ${file.name}`}
                  className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                  onClick={() => onRemove(file)}
                  title="Remove file"
                  type="button"
                >
                  <Trash2 size={19} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileList;