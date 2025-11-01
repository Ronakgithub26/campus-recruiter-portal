import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JobsList() {
  const [jobs, setJobs] = useState([]); // ✅ Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8090/recruiter/jobs");
        if (response.ok) {
          const data = await response.json();
          setJobs(data || []); // ✅ Defensive check in case backend returns null
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (err) {
        setError("Error connecting to backend");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id || job._id}
              className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{job.title}</div>
                <div className="text-sm text-gray-500">
                  {job.companyName || "Unknown Company"} • {job.skillsRequired || "N/A"}
                </div>
                <div className="text-xs text-gray-400">
                  Deadline: {job.deadline || "Not specified"}
                </div>
              </div>
              <Link
                to={`/student/job/${job.id || job._id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
