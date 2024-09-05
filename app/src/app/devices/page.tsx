"use server";

import { Device } from "@/lib/types";
import Link from "next/link";

const getDevices = async () => {
  const endpoint = "http://127.0.01:8000/api/devices/";
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const Devices = async () => {
  const devices: Device[] = await getDevices();
  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="text-4xl">My Devices</h1>
      <div className="mt-5 flex flex-col gap-2">
        {devices.map((device) => (
          <p
            key={device.id}
            className="text-x1 text-blue-500 hover:text-blue-600"
          >
            <Link href={`/devices/${device.slug}`}>{device.name}</Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Devices;
