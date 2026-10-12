import DeviceCard from "../Components/devices/DeviceCard";
import { getDeviceInfo } from "../utils/device";

function Devices() {
  const info = getDeviceInfo();
  console.log(info)

  const currentDevice = {
    name: info.name,
    type: `${info.type} (this device)`,
    active: "Active now",
    online: true,
    icon: info.type === "Phone" ? "phone" : "laptop",
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 sm:text-[30px]">
          Devices
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Your LinkPad workspace, wherever you are.
        </p>
      </div>

      <section>
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-slate-900">Signed in on</h2>
          <p className="mt-1 text-xs text-slate-500">
            Devices signed in to your account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <DeviceCard device={currentDevice} onRemove={() => {}} />
        </div>
      </section>
    </div>
  );
}

export default Devices;