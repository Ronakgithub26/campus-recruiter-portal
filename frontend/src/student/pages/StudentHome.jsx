export default function StudentHome() {
  const stats = [
    { label: "Open Jobs", value: 24 },
    { label: "Applied", value: 3 },
    { label: "Shortlisted", value: 1 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-2">Quick Actions</h2>
        <div className="flex gap-3">
          <a
            href="/student/jobs"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Browse Jobs
          </a>
          <a
            href="/student/applications"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            My Applications
          </a>
        </div>
      </div>
    </div>
  );
}
