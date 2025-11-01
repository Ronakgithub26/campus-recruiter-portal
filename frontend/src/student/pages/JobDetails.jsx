import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function JobDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch job details from backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:8090/recruiter/jobs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          setError("Failed to load job details");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Server error while loading job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ✅ Handle job application
  const handleApply = () => {
    const apps = JSON.parse(localStorage.getItem("studentApps") || "[]");

    // prevent duplicate apply
    if (!apps.find((a) => a.jobId === job.id || a.jobId === job._id)) {
      apps.push({
        id: Date.now().toString(),
        jobId: job.id || job._id,
        title: job.title,
        status: "Applied",
      });
      localStorage.setItem("studentApps", JSON.stringify(apps));
    }

    setApplied(true);
    setTimeout(() => nav("/student/applications"), 700);
  };

  // ✅ Handle loading and errors
  if (loading) return <p>Loading job details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!job) return <p>No job found.</p>;

  return (
    <div className="bg-white p-6 rounded shadow-sm max-w-3xl">
      <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
      <div className="text-sm text-gray-500 mb-4">
        {job.companyName || "Unknown Company"} • Skills:{" "}
        {job.skillsRequired || "N/A"}
      </div>

      <p className="text-gray-700 mb-4">{job.description}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleApply}
          disabled={applied}
          className={`px-4 py-2 rounded ${
            applied ? "bg-gray-300" : "bg-blue-600 text-white"
          }`}
        >
          {applied ? "Applied" : "Apply Now"}
        </button>
        <div className="text-sm text-gray-500">
          Deadline: {job.deadline || "Not specified"}
        </div>
      </div>
    </div>
  );
}
