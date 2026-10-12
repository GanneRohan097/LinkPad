import { useState } from "react";
import { Check, Copy, RefreshCw, Smartphone } from "lucide-react";

function ConnectionCode({ code, onRegenerate }) {
  const [copyStatus, setCopyStatus] = useState("");
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy unavailable");
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><h3 className="text-sm font-semibold text-slate-900">Your connection code</h3><p className="mt-1 text-xs text-slate-500">Enter this code on the device you want to connect.</p></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><Smartphone size={17} /></span></div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"><span className="font-mono text-xl font-semibold tracking-[0.18em] text-slate-800">{code}</span><div className="flex items-center gap-1"><span aria-live="polite" className="text-[11px] text-slate-500">{copyStatus}</span><button aria-label="Copy connection code" className="grid h-9 w-9 place-items-center rounded-md text-slate-500" onClick={copyCode} type="button">{copyStatus === "Copied" ? <Check size={16} /> : <Copy size={16} />}</button><button aria-label="Regenerate connection code" className="grid h-9 w-9 place-items-center rounded-md text-slate-500" onClick={() => { onRegenerate(); setCopyStatus(""); }} type="button"><RefreshCw size={16} /></button></div></div>
      <p className="mt-4 text-xs leading-5 text-slate-500">Open LinkPad on your other device and choose <span className="font-medium text-slate-700">Connect to workspace</span>. Your code is valid for the next 10 minutes.</p>
    </div>
  );
}

export default ConnectionCode;
