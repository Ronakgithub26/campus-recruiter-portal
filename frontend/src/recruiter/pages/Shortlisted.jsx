import ApplicantCard from "../components/ApplicantCard";
import { useState } from "react";

export default function Shortlisted() {
  const [shortlisted, setShortlisted] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      skills: "React, Node",
      status: "Shortlisted",
    },
  ]);

  return (
    <div className="flex flex-col gap-4">
      {shortlisted.length > 0 ? (
        shortlisted.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onShortlist={() => {}}
            onReject={() => {}}
          />
        ))
      ) : (
        <p className="text-gray-500">No shortlisted candidates yet.</p>
      )}
    </div>
  );
}
