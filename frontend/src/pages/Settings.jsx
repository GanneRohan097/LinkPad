
import { useState,useEffect } from "react";
import {
  Files,
  HardDrive,
  LockKeyhole,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Section({ title, description, children }) {

  return (
    <section className="border-b border-slate-100 px-5 py-5 last:border-b-0 dark:border-slate-700 sm:px-6">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Settings() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
  const name = user.user.name;
  const email = user.user.email;
  const token = localStorage.getItem("token");
  async function fetchStorage() {
     const result = await fetch('https://linkpad-q82m.onrender.com/api/files/storage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     const data = await result.json();
     setTotalSize(data.data.usedBytes);
     setTotalFiles(data.data.totalFiles);
  }
  useEffect(()=>{
       fetchStorage();
  },[])
  const [profile, setProfile] = useState({
    name: name,
    email: email,
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const { theme, toggleTheme } = useTheme();
  const [totalSize, setTotalSize] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const saveProfile = (event) => {
    event.preventDefault();
    setProfile(draft);
    setEditing(false);
  };

  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[30px]">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Manage your profile and workspace preferences.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <Section title="Profile" description="Your personal details and account information.">
          {editing ? (
            <form
              className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]"
              onSubmit={saveProfile}
            >
              <input
                aria-label="Profile name"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                value={draft.name}
              />
              <input
                aria-label="Profile email"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                type="email"
                value={draft.email}
              />
              <button
                className="h-10 rounded-lg bg-blue-600 px-4 text-xs font-medium text-white"
                type="submit"
              >
                Save
              </button>
              <button
                className="h-10 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
                onClick={() => {
                  setDraft(profile);
                  setEditing(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{profile.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{profile.email}</p>
                </div>
              </div>

            </div>
          )}
        </Section>

        <Section title="Appearance" description="Choose how LinkPad looks on this device.">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Light", icon: Sun },
              { name: "Dark", icon: Moon },
            ].map(({ name, icon: Icon }) => {
              const selected = (name === "Dark") === isDark;

              return (
                <button
                  key={name}
                  aria-pressed={selected}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left ${
                    selected
                      ? "border-blue-300 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/40"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                  onClick={() => {
                    if ((name === "Dark") !== isDark) toggleTheme();
                  }}
                  type="button"
                >
                  <Icon
                    size={17}
                    className={selected ? "text-blue-700 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}
                  />
                  <span className={`text-xs font-medium ${
                    selected ? "text-blue-800 dark:text-blue-300" : "text-slate-700 dark:text-slate-300"
                  }`}>
                    {name}
                  </span>
                  {selected && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
                </button>
              );
            })}
          </div>
        </Section>

<Section
  title="File Storage"
  description="View the storage used by your uploaded files."
>
  <div className="max-w-xl rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
        <HardDrive size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total storage used
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {(totalSize / 1000000).toFixed(2)} MB
        </p>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <Files size={16} />
        <span className="text-xs">Total uploaded files</span>
      </div>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold dark:bg-blue-950 dark:text-white">
        {totalFiles}
      </span>
    </div>
  </div>
</Section>


        <Section title="Security" description="Keep your account and files safe.">
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            <div className="flex items-center gap-3 py-3 first:pt-0">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <LockKeyhole size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-100">Password</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Password management requires an account service.
                </p>
              </div>
              <button
                className="text-xs font-medium text-blue-700 dark:text-blue-400"
              
                type="button"
              >
                Change
              </button>
            </div>
          </div>
        </Section>
      </div>

    </div>
  );
}

export default Settings;
