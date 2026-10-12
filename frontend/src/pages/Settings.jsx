import { useState } from "react";
import { Laptop, LockKeyhole, Moon, ShieldCheck, Smartphone, Sun, UserRound } from "lucide-react";

function Section({ title, description, children }) {
  return <section className="border-b border-slate-100 px-5 py-5 last:border-b-0 sm:px-6"><div className="mb-4"><h2 className="text-sm font-semibold text-slate-900">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div>{children}</section>;
}

function Settings() {
  const [profile, setProfile] = useState({ name: "Alex Morgan", email: "alex.morgan@email.com" });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [theme, setTheme] = useState("Light");
  const [twoFactor, setTwoFactor] = useState(false);
  const [securityMessage, setSecurityMessage] = useState("");
  const saveProfile = (event) => {
    event.preventDefault();
    setProfile(draft);
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-[26px] font-semibold tracking-tight text-slate-900 sm:text-[30px]">Settings</h1><p className="mt-1.5 text-sm text-slate-500">Manage your profile and workspace preferences.</p></div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Section title="Profile" description="Your personal details and account information.">
          {editing ? <form className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]" onSubmit={saveProfile}><input aria-label="Profile name" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" onChange={(event) => setDraft({ ...draft, name: event.target.value })} value={draft.name} /><input aria-label="Profile email" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" onChange={(event) => setDraft({ ...draft, email: event.target.value })} type="email" value={draft.email} /><button className="h-10 rounded-lg bg-blue-600 px-4 text-xs font-medium text-white" type="submit">Save</button><button className="h-10 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700" onClick={() => { setDraft(profile); setEditing(false); }} type="button">Cancel</button></form> : <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">{profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</div><div><p className="text-sm font-medium text-slate-800">{profile.name}</p><p className="mt-0.5 text-xs text-slate-500">{profile.email}</p></div></div><button className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700" onClick={() => { setDraft(profile); setEditing(true); }} type="button">Edit profile</button></div>}
        </Section>
        <Section title="Appearance" description="Choose how LinkPad looks on this device.">
          <div className="grid gap-3 sm:grid-cols-3">{[{ name: "Light", icon: Sun }, { name: "Dark", icon: Moon }, { name: "System", icon: Laptop }].map(({ name, icon: Icon }) => <button key={name} aria-pressed={theme === name} className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left ${theme === name ? "border-blue-300 bg-blue-50/50" : "border-slate-200"}`} onClick={() => setTheme(name)} type="button"><Icon size={17} className={theme === name ? "text-blue-700" : "text-slate-500"} /><span className={`text-xs font-medium ${theme === name ? "text-blue-800" : "text-slate-700"}`}>{name}</span>{theme === name && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}</button>)}</div>
        </Section>
        <Section title="Storage" description="Your files, notes, and attachments all count toward your plan.">
          <div className="max-w-xl"><div className="flex items-center justify-between text-xs"><span className="font-medium text-slate-700">2.4 GB used</span><span className="text-slate-500">10 GB total</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[24%] rounded-full bg-blue-600" /></div><p className="mt-2 text-xs text-slate-500">7.6 GB of storage available</p></div>
        </Section>
        <Section title="Connected devices" description="Devices currently linked to your workspace.">
          <div className="flex flex-wrap items-center gap-5"><div className="flex items-center gap-2.5"><Laptop size={17} className="text-slate-500" /><div><p className="text-xs font-medium text-slate-700">MacBook Pro</p><p className="text-[11px] text-emerald-700">Online</p></div></div><div className="flex items-center gap-2.5"><Smartphone size={17} className="text-slate-500" /><div><p className="text-xs font-medium text-slate-700">iPhone 15</p><p className="text-[11px] text-emerald-700">Online</p></div></div><span className="text-xs text-slate-500">+ 1 other device</span></div>
        </Section>
        <Section title="Security" description="Keep your account and files safe.">
          <div className="divide-y divide-slate-100"><div className="flex items-center gap-3 py-3 first:pt-0"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600"><LockKeyhole size={16} /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium text-slate-800">Password</p><p className="mt-0.5 text-xs text-slate-500">Password management requires an account service.</p></div><button className="text-xs font-medium text-blue-700" onClick={() => setSecurityMessage("Password changes are not available in this frontend-only demo.")} type="button">Change</button></div><div className="flex items-center gap-3 py-3 last:pb-0"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600"><ShieldCheck size={16} /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium text-slate-800">Two-factor authentication</p><p className="mt-0.5 text-xs text-slate-500">Toggle the visual account preference</p></div><button aria-pressed={twoFactor} className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${twoFactor ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`} onClick={() => setTwoFactor((enabled) => !enabled)} type="button">{twoFactor ? "Enabled" : "Not enabled"}</button></div></div><p aria-live="polite" className="mt-2 text-xs text-slate-500">{securityMessage}</p>
        </Section>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600"><UserRound size={17} /></span><div><p className="text-xs font-medium text-slate-800">Personal workspace</p><p className="mt-0.5 text-xs text-slate-500">You’re on the Free plan.</p></div></div>
    </div>
  );
}

export default Settings;
