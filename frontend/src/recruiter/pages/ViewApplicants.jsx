import ApplicantCard from "../components/ApplicantCard";
import { useState } from "react";

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Alice Johnson", skills: "React, Node", status: "Applied" },
    { id: 2, name: "Bob Smith", skills: "Python, Django", status: "Applied" },
  ]);

  const handleShortlist = (id) => {
    setApplicants(
      applicants.map((a) => (a.id === id ? { ...a, status: "Shortlisted" } : a))
    );
  };

  const handleReject = (id) => {
    setApplicants(
      applicants.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {applicants.map((applicant) => (
        <ApplicantCard
          key={applicant.id}
          applicant={applicant}
          onShortlist={handleShortlist}
          onReject={handleReject}
        />
      ))}
      {applicants.length === 0 && (
        <p className="text-gray-500">No applicants yet.</p>
      )}
    </div>
  );
}
