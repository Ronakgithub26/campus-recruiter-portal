import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import.meta.env.VITE_API_BASE_URL


export default function JobDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeChoice, setResumeChoice] = useState("existing");
  const [resumeId, setResumeId] = useState(null);

   // ✅ Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recruiter/jobs/${id}`);
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

  // ✅ Open model on click
  const handleApplyClick = () => {
    setShowResumeModal(true);
  };

  const uploadResume = async () => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/resume/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.resumeId;
};


  const handleApply = async () => {
  console.log("Full job object:", job);

  try {
    // ⭐ GET EMAIL CORRECTLY
    const tokenData = JSON.parse(localStorage.getItem("student_token"));
    const studentEmail = tokenData?.user?.email;

    let finalResumeId = null;

    if (resumeChoice === "existing") {
      finalResumeId = localStorage.getItem("resumeId");
    }

    if (resumeChoice === "upload") {
      finalResumeId = await uploadResume();
      localStorage.setItem("resumeId", finalResumeId);
    }

    const payload = {
      jobId: job._id || job.id,
      title: job.title,
      studentEmail: studentEmail,   // 💥 FIXED
      resumeId: finalResumeId,
    };

    console.log("⛳ FINAL PAYLOAD GOING TO BACKEND:", payload);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/student/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    // ⬇️ Save application locally
    let saved = JSON.parse(localStorage.getItem("studentApps") || "[]");
    saved.push(data);
    localStorage.setItem("studentApps", JSON.stringify(saved));
    console.log("Backend Response:", data);

    if (res.ok) {
      alert("Application submitted!");
      nav("/student/applications");
    } else {
      alert("Failed to apply");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};



  if (loading) return <p>Loading job details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!job) return <p>No job found.</p>;

  return (
    <div className="bg-white p-6 rounded shadow-sm max-w-3xl">
      <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
      <div className="text-sm text-gray-500 mb-4">
        {job.companyName || "Unknown Company"} • Skills: {job.skillsRequired || "N/A"}
      </div>

      <p className="text-gray-700 mb-4">{job.description}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleApplyClick}
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

      {/* ✅ Resume Selection Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Select Resume Option</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="resumeChoice"
                  value="existing"
                  checked={resumeChoice === "existing"}
                  onChange={() => setResumeChoice("existing")}
                />
                Use existing resume (from your profile)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="resumeChoice"
                  value="upload"
                  checked={resumeChoice === "upload"}
                  onChange={() => setResumeChoice("upload")}
                />
                Upload from device
              </label>

              {resumeChoice === "upload" && (
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="border p-2 w-full rounded"
                />
              )}
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-3 py-1 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={resumeChoice === "upload" && !selectedFile}
                className="px-4 py-1 rounded bg-blue-600 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
