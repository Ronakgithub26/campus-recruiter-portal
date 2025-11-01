import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch recruiter jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8090/recruiter/jobs");
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Server error while loading jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ✅ Edit/Delete/View functions
  const handleEdit = (id) => {
    // You can later navigate to edit form: nav(`/recruiter/editjob/${id}`)
    alert("Edit job: " + id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const res = await fetch(`http://localhost:8090/recruiter/deletejob/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setJobs(jobs.filter((job) => job.id !== id && job._id !== id));
        } else {
          alert("Failed to delete job.");
        }
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  const handleViewApplicants = (id) => {
    alert("View applicants for job: " + id);
  };

  // ✅ Conditional rendering
  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard
            key={job.id || job._id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewApplicants={handleViewApplicants}
          />
        ))
      ) : (
        <p className="text-gray-500">No jobs posted yet.</p>
      )}
    </div>
  );
}
