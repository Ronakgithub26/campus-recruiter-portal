import { useEffect, useState } from "react";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentApps") || "[]");
    setApps(stored);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Applications</h2>
      <div className="flex flex-col gap-3">
        {apps.length === 0 && (
          <div className="text-gray-500">No applications yet.</div>
        )}
        {apps.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="text-sm text-gray-500">Status: {a.status}</div>
            </div>
            <div className="text-sm text-gray-500">Job ID: {a.jobId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
