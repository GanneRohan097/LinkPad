
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

const iconStyles = {
  pdf: "bg-rose-50 text-rose-600",
  figma: "bg-violet-50 text-violet-600",
  word: "bg-blue-50 text-blue-600",
  zip: "bg-amber-50 text-amber-600",
  sheet: "bg-emerald-50 text-emerald-600",
};

function FileCard({ file, onRemove, onDownload }) {
  const Icon = fileIcons[file.kind] || FileText;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <span
          className={`grid h-14 w-14 place-items-center rounded-xl ${
            iconStyles[file.kind] || iconStyles.pdf
          }`}
        >
          <Icon size={26} strokeWidth={1.8} />
        </span>

        <div className="flex items-center gap-1">
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
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
            onClick={() => onRemove(file)}
            title="Remove file"
            type="button"
          >
            <Trash2 size={19} />
          </button>
        </div>
      </div>

      <h2 className="mt-5 truncate text-base font-medium text-slate-800 dark:text-slate-100">
        {file.name}
      </h2>

      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
        {file.size}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <span>{file.time}</span>
      </div>
    </article>
  );
}

export default FileCard;
