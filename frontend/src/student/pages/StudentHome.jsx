import { useEffect, useState } from "react";

export default function StudentHome() {
  const [stats, setStats] = useState({
    openJobs: 0,
    applied: 0,
    shortlisted: 0,
  });

  const [announcements, setAnnouncements] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("student_token") || "{}");
    const email = saved.user?.email;

    if (!email) return;

    fetch(`http://localhost:8090/student/stats/${email}`)
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("http://localhost:8090/student/notices")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data.announcements);
        setDeadlines(data.deadlines);
      });
  }, []);

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Open Jobs", value: stats.openJobs },
          { label: "Applied", value: stats.applied },
          { label: "Shortlisted", value: stats.shortlisted },
        ].map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Announcement Board */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">📢 Announcements</h2>

        <div className="h-32 overflow-hidden relative">
          <div className="animate-scroll">
            {announcements.map((a) => (
              <div key={a.id} className="py-2 text-gray-700 text-sm">
                {a.message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deadline Board */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">⏳ Upcoming Deadlines</h2>

        <div className="h-32 overflow-hidden relative">
          <div className="animate-scroll">
            {deadlines.map((d) => (
              <div key={d.id} className="py-2 text-gray-700 text-sm">
                <strong>{d.role}</strong> — Deadline:{" "}
                {new Date(d.deadline).toLocaleDateString()}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
