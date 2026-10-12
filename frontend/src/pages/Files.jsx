import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import FileCard from "../Components/files/FileCard";
import FileFilters from "../Components/files/FileFilters";
import FileList from "../Components/files/FileList";

const API_URL = "https://linkpad-q82m.onrender.com/api/files";

const getFileKind = (name) => {
  const extension = name.split(".").pop().toLowerCase();

  const types = {
    pdf: "pdf",
    fig: "figma",
    doc: "word",
    docx: "word",
    zip: "zip",
    xls: "sheet",
    xlsx: "sheet",
    png: "figma",
    jpg: "figma",
    jpeg: "figma",
  };

  return types[extension] || "other";
};

const formatSize = (bytes) => {
  const size = Number(bytes);

  if (size >= 1024 ** 3) {
    return `${(size / 1024 ** 3).toFixed(1)} GB`;
  }

  if (size >= 1024 ** 2) {
    return `${(size / 1024 ** 2).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))} KB`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const mapFile = (file) => ({
  id: file.id,
  name: file.original_name,
  type: file.file_type || "File",
  size: formatSize(file.file_size),
  time: formatDate(file.created_at),
  source: "LinkPad",
  kind: getFileKind(file.original_name),
});

function FilesPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All file types");
  const [sort, setSort] = useState("Recently added");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fileInput = useRef(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to view your files.");
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch files.");
      }

      setItems(result.data.map(mapFile));
    } catch (err) {
      setError(err.message || "Unable to load files.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const addFiles = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    event.target.value = "";

    if (!selectedFiles.length) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to upload files.");
      }

      let uploadedCount = 0;

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            `${file.name}: ${result.message || "Upload failed."}`,
          );
        }

        uploadedCount++;
      }

      setMessage(
        uploadedCount === 1
          ? "File uploaded successfully."
          : `${uploadedCount} files uploaded successfully.`,
      );

      await fetchFiles();
    } catch (err) {
      setError(err.message || "Unable to upload files.");
      await fetchFiles();
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (file) => {
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to download files.");
      }

      const response = await fetch(`${API_URL}/${file.id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Download failed.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

      setMessage("File downloaded successfully.");
    } catch (err) {
      setError(err.message || "Unable to download file.");
    }
  };

  const visibleFiles = useMemo(() => {
    const filtered = items.filter((file) => {
      const matchesSearch = `${file.name} ${file.type} ${file.source}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const extension = file.name.split(".").pop().toLowerCase();

      const typeMap = {
        PDF: ["pdf"],
        Image: ["png", "jpg", "jpeg", "gif", "webp"],
        "Word document": ["doc", "docx"],
        Spreadsheet: ["xls", "xlsx", "csv"],
        Archive: ["zip", "rar", "7z"],
      };

      const matchesType =
        type === "All file types" ||
        (type === "Other"
          ? !Object.values(typeMap).flat().includes(extension)
          : typeMap[type]?.includes(extension));

      return matchesSearch && matchesType;
    });

    if (sort === "Name A–Z") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "Name Z–A") {
      return filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sort === "Largest first") {
      const bytes = (size) => {
        const [amount, unit] = size.split(" ");

        return (
          Number(amount) *
          (unit === "GB" ? 1024 ** 3 : unit === "MB" ? 1024 ** 2 : 1024)
        );
      };

      return filtered.sort((a, b) => bytes(b.size) - bytes(a.size));
    }

    if (sort === "Recently added") {
      return filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [items, search, sort, type]);

const removeFile = async (file) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${file.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete file");
    }

    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== file.id)
    );
  } catch (error) {
    console.error("Delete error:", error);
    alert(error.message || "Failed to delete file");
  }
};

  return (
    <div className="space-y-8">
      <input
        ref={fileInput}
        className="hidden"
        multiple
        onChange={addFiles}
        type="file"
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-[30px] font-semibold tracking-tight text-slate-900 sm:text-[36px]">
            Files
          </h1>

          <p className="mt-2 text-base text-slate-500">
            All your files, together and in sync.
          </p>
        </div>

        <button
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-base font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={uploading}
          onClick={() => fileInput.current?.click()}
          type="button"
        >
          <Plus size={20} />
          {uploading ? "Uploading..." : "Upload file"}
        </button>
      </div>

      <FileFilters
        search={search}
        onSearch={setSearch}
        type={type}
        onType={setType}
        sort={sort}
        onSort={setSort}
        view={view}
        onView={setView}
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-slate-700">
          All files{" "}
          <span className="ml-1.5 text-sm font-normal text-slate-400">
            {visibleFiles.length} items
          </span>
        </p>

        <p className="text-sm text-slate-500">{sort}</p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center text-base text-slate-500">
          Loading your files...
        </div>
      ) : visibleFiles.length ? (
        view === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onRemove={removeFile}
                onDownload={downloadFile}
              />
            ))}
          </div>
        ) : (
          <FileList
            files={visibleFiles}
            onRemove={removeFile}
            onDownload={downloadFile}
          />
        )
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center text-base text-slate-500">
          {search || type !== "All file types"
            ? "No files match your search."
            : "No files uploaded yet. Upload your first file to get started."}
        </div>
      )}
    </div>
  );
}

export default FilesPage;
