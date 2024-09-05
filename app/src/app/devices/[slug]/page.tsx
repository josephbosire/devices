import { Device } from "@/lib/types";
import Link from "next/link";

type PageProps = {
  params: { slug: string };
};

const getDevice = async (slug: string) => {
  const endpoint = `http://127.0.01:8000/api/devices/${slug}/`;
  const res = await fetch(endpoint, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const DeviceDetails = async ({ params }: PageProps) => {
  const device: Device = await getDevice(params.slug);
  return (
    <div
      className="
  flex flex-col items-center mt-2"
    >
      <h1 className="text-4x1">Device: {params.slug}</h1>
      <div className="mt-6 border-top">
        <p className="text-x1">
          {device.id} - {device.name}
        </p>
        <div className="mt-3">
          {device.location ? (
            <>
              <p>
                {" "}
                Current Location:{" "}
                <span className="font-bold">{device.location.name}</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-red-400"> Device has no location!</p>
            </>
          )}
          <button className="mt-4 p-2 text-white font-bold roundeds bg-green-500">
            {" "}
            Assign new location
          </button>
          <Link className="pl-2 text-blue-400 space-y-1" href={"/devices"}>
            Back To Devices
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
