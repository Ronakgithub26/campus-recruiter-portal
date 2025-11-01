import React, { useState } from "react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // retrieve recruiter info from localStorage (optional)
      const stored = JSON.parse(localStorage.getItem("recruiter"));
      const recruiterEmail = stored?.email || null;

      const payload = recruiterEmail
        ? { ...formData, recruiterEmail }
        : formData;

      const response = await fetch("http://localhost:8090/recruiter/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job saved:", data);
        setMessage("✅ Job posted successfully!");
        setFormData({ title: "", description: "", skills: "", deadline: "" });
      } else {
        setMessage("❌ Failed to post job. Try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setMessage("⚠️ Error connecting to server.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Post a New Job
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills Required"
          value={formData.skillsRequired}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post Job
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
}
