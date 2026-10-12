import { useState } from "react";
import { Link2 } from "lucide-react";
import ConnectionCode from "./ConnectionCode";

function PairDevice({ code, onRegenerate, onConnect }) {
  const [deviceName, setDeviceName] = useState("");
  const [message, setMessage] = useState("");
  const connect = () => {
    if (!deviceName.trim()) {
      setMessage("Enter a name for the device first.");
      return;
    }
    onConnect(deviceName.trim());
    setMessage(`${deviceName.trim()} connected to your workspace.`);
    setDeviceName("");
  };

  return (
    <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] lg:items-center">
        <div><span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-blue-700"><Link2 size={19} /></span><h2 className="mt-4 text-lg font-semibold text-slate-900">Connect another device</h2><p className="mt-2 max-w-md text-sm leading-6 text-slate-600">Keep your workspace close wherever you are. Use the code to securely connect a new device to LinkPad.</p><div className="mt-4 flex flex-col gap-2 sm:flex-row"><input aria-label="New device name" className="h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none placeholder:text-slate-400" onChange={(event) => setDeviceName(event.target.value)} placeholder="Name this device" value={deviceName} /><button className="h-10 shrink-0 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white" onClick={connect} type="button">Connect device</button></div><p aria-live="polite" className="mt-2 min-h-4 text-xs text-slate-500">{message}</p></div>
        <ConnectionCode code={code} onRegenerate={onRegenerate} />
      </div>
    </section>
  );
}

export default PairDevice;
