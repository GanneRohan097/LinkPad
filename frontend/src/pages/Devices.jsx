
import { useEffect, useState } from "react";
import DeviceCard from "../Components/devices/DeviceCard";
import { getDeviceInfo } from "../utils/device";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://linkpad-q82m.onrender.com/api/devices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch devices");
        }

        const currentInfo = getDeviceInfo();
        const currentIdentifier = localStorage.getItem("deviceIdentifier");

        setDevices(
          (data.devices || []).map((device) => {
            const isCurrent =
              currentIdentifier &&
              device.device_identifier === currentIdentifier;

            return {
              id: device.id,
              name: device.device_name,
              type: isCurrent
                ? `${device.device_type || currentInfo.type} (this device)`
                : device.device_type || "Unknown device",
              browser: device.browser || "Unknown browser",
              os: device.os || "Unknown OS",
              active: formatLastActive(device.last_active),
              icon:
                (device.device_type || "").toLowerCase().includes("phone") ||
                (device.device_type || "").toLowerCase().includes("mobile")
                  ? "phone"
                  : "laptop",
            };
          })
        );
      } catch (err) {
        console.error("Failed to fetch devices:", err);
        setError("Unable to load your devices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[30px]">
          Devices
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Your LinkPad workspace, wherever you are.
        </p>
      </div>

      <section>
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Signed in on
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Devices signed in to your account.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading devices...
          </p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : devices.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No signed-in devices found.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onRemove={() => {}}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function formatLastActive(value) {
  if (!value) return "Activity unknown";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Activity unknown";

  const diffSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

  if (diffSeconds < 60) return "Active just now";
  if (diffSeconds < 3600) {
    return `Active ${Math.floor(diffSeconds / 60)} min ago`;
  }
  if (diffSeconds < 86400) {
    return `Active ${Math.floor(diffSeconds / 3600)} hr ago`;
  }
  if (diffSeconds < 604800) {
    return `Active ${Math.floor(diffSeconds / 86400)} days ago`;
  }

  return `Last active ${date.toLocaleDateString()}`;
}

export default Devices;
