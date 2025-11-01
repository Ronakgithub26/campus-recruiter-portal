import React, { useState } from "react";

function ResumeForm() {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: ""
  });

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8090/api/resume/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...resume,
        skills: resume.skills.split(",").map((s) => s.trim())
      }),
    });
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <div>
      <h2>Resume Builder</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <textarea name="summary" placeholder="Summary" onChange={handleChange}></textarea>
      <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
      <button onClick={handleSubmit}>Generate PDF</button>
    </div>
  );
}

export default ResumeForm;
