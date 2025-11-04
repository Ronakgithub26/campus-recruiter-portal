import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeBuilder() {
  const rajasthanColleges = [
    "Rajasthan Technical University, Kota",
    "Government Engineering College, Ajmer",
    "JECRC University, Jaipur",
    "Poornima College of Engineering, Jaipur",
    "SKIT Jaipur",
    "LNMIIT Jaipur",
    "Arya College of Engineering, Jaipur",
    "MBM Engineering College, Jodhpur",
    "Manipal University Jaipur",
    "Others (Enter manually)",
  ];

  const branches = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics and Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Artificial Intelligence and Data Science",
    "Other",
  ];

  const years = ["2023", "2024", "2025", "2026", "2027"];

  const durations = ["1 Month", "2 Months", "3 Months", "4 Months", "6 Months", "1 Year"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    college: "",
    customCollege: "",
    branch: "",
    passingYear: "",
    summary: "",
    internships: [{ company: "", role: "", type: "", duration: "" }],
    projects: [{ title: "", description: "", github: "" }],
    skills: "",
    achievements: "",
    certifications: "",
    template: "modern",
  });

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^((\+91)?|91)?[6-9][0-9]{9}$/.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInternshipChange = (index, field, value) => {
    const updated = formData.internships.map((intern, i) =>
      i === index ? { ...intern, [field]: value } : intern
    );
    setFormData((prev) => ({ ...prev, internships: updated }));
  };

  const addInternship = () =>
    setFormData((prev) => ({
      ...prev,
      internships: [...prev.internships, { company: "", role: "", type: "", duration: "" }],
    }));

  const handleProjectChange = (index, field, value) => {
    const updated = formData.projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    setFormData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () =>
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", github: "" }],
    }));

  const generateAISummary = () => {
    const { name, branch, college, skills } = formData;
    const summary = `${name || "A motivated student"} from ${college || "a reputed college"}, specializing in ${branch || "Engineering"}. Skilled in ${skills || "modern web technologies"}, passionate about innovation and continuous learning.`;
    setFormData((prev) => ({ ...prev, summary }));
  };

  const handleDownload = async () => {
    const input = document.getElementById("resume-preview");
    const canvas = await html2canvas(input);
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
    pdf.save(`${formData.name || "resume"}.pdf`);
  };

  const internshipRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "React.js Intern",
    "Node.js Intern",
    "UI/UX Designer",
    "DevOps Intern",
    "Software Tester",
    "Mobile App Developer",
  ];

  const templates = {
    modern: {
      container: "bg-white rounded-2xl shadow-xl",
      heading: "text-3xl font-bold text-blue-700",
      sectionTitle: "text-lg font-semibold text-blue-600",
      accent: "text-blue-600",
    },
    classic: {
      container: "bg-white rounded shadow-md",
      heading: "text-3xl font-semibold text-gray-800",
      sectionTitle: "text-md font-medium text-gray-700",
      accent: "text-gray-700",
    },
  };

  const currentTemplate = templates[formData.template];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-10 px-5 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">AI Resume Builder - Campus Recruitment Portal</h1>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[80vh]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-blue-600">Summary</h2>
            <div className="flex gap-2">
              <select name="template" value={formData.template} onChange={handleChange} className="border rounded p-2">
                <option value="modern">Modern Template</option>
                <option value="classic">Classic Template</option>
              </select>
              <button onClick={generateAISummary} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">AI Generate</button>
            </div>
          </div>
          <textarea className="p-3 rounded border border-gray-300 w-full mb-4" name="summary" placeholder="Write or generate a summary..." value={formData.summary} onChange={handleChange} />

          <h3 className="text-xl font-semibold text-blue-600 mb-2">Personal Info</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input className="p-2 rounded border" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input className="p-2 rounded border" name="email" placeholder="Email (e.g. example@gmail.com)" value={formData.email} onChange={handleChange} />
            <input className="p-2 rounded border" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} />
            <select className="p-2 rounded border" name="college" value={formData.college} onChange={handleChange}>
              <option value="">Select College</option>
              {rajasthanColleges.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            {formData.college === "Others (Enter manually)" && (
              <input className="p-2 rounded border" name="customCollege" placeholder="Enter College Name" value={formData.customCollege} onChange={handleChange} />
            )}
            <select className="p-2 rounded border" name="branch" value={formData.branch} onChange={handleChange}>
              <option value="">Select Branch</option>
              {branches.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>
            <select className="p-2 rounded border" name="passingYear" value={formData.passingYear} onChange={handleChange}>
              <option value="">Passing Year</option>
              {years.map((y, i) => (
                <option key={i} value={y}>{y}</option>
              ))}
            </select>
            <input className="p-2 rounded border" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} />
            <input className="p-2 rounded border" name="github" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} />
          </div>

          <h3 className="text-xl font-semibold text-blue-600 mb-2">Internships</h3>
          {formData.internships.map((i, idx) => (
            <div key={idx} className="mb-3 p-3 rounded border bg-blue-50">
              <input className="p-2 rounded border w-full mb-2" placeholder="Company Name" value={i.company} onChange={(e) => handleInternshipChange(idx, "company", e.target.value)} />
              <select className="p-2 rounded border w-full mb-2" value={i.role} onChange={(e) => handleInternshipChange(idx, "role", e.target.value)}>
                <option value="">Select Internship Role</option>
                {internshipRoles.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <select className="p-2 rounded border w-full" value={i.type} onChange={(e) => handleInternshipChange(idx, "type", e.target.value)}>
                  <option value="">Type</option>
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <select className="p-2 rounded border w-full" value={i.duration} onChange={(e) => handleInternshipChange(idx, "duration", e.target.value)}>
                  <option value="">Select Duration</option>
                  {durations.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <button onClick={addInternship} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">+ Add Internship</button>

          <h3 className="text-xl font-semibold text-blue-600 mb-2 mt-4">Projects</h3>
          {formData.projects.map((p, idx) => (
            <div key={idx} className="mb-3 p-3 rounded border bg-blue-50">
              <input className="p-2 rounded border w-full mb-2" placeholder="Project Title" value={p.title} onChange={(e) => handleProjectChange(idx, "title", e.target.value)} />
              <textarea className="p-2 rounded border w-full mb-2" placeholder="Project Description" value={p.description} onChange={(e) => handleProjectChange(idx, "description", e.target.value)} />
              <input className="p-2 rounded border w-full" placeholder="GitHub / Live Link" value={p.github} onChange={(e) => handleProjectChange(idx, "github", e.target.value)} />
            </div>
          ))}
          <button onClick={addProject} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">+ Add Project</button>

          <div className="mt-4">
            <textarea className="p-2 rounded border w-full mb-2" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />
            <textarea className="p-2 rounded border w-full mb-2" name="achievements" placeholder="Achievements" value={formData.achievements} onChange={handleChange} />
            <textarea className="p-2 rounded border w-full" name="certifications" placeholder="Certifications" value={formData.certifications} onChange={handleChange} />
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg">Download PDF</button>
          </div>
        </div>

        <div id="resume-preview" className={`${currentTemplate.container} p-6 rounded-2xl shadow-inner overflow-auto`}>
          <div className="flex items-start justify-between">
            <div>
              <div className={currentTemplate.heading}>{formData.name || "Your Name"}</div>
              <div className="mt-1 text-sm text-gray-600">{formData.email} {formData.phone && ` | ${formData.phone}`}</div>
              <div className="mt-1 text-sm text-gray-600">{(formData.college === "Others (Enter manually)" ? formData.customCollege : formData.college) || "College"} {formData.branch && ` • ${formData.branch}`} {formData.passingYear && ` • ${formData.passingYear}`}</div>
              <div className="mt-1 text-sm text-gray-600">{formData.linkedin && (<a href={formData.linkedin} target="_blank" rel="noreferrer" className="underline">LinkedIn</a>)} {formData.github && (<a href={formData.github} target="_blank" rel="noreferrer" className="underline ml-2">GitHub</a>)}</div>
            </div>
            <div className="text-sm text-gray-600">Template: <span className={currentTemplate.accent}>{formData.template}</span></div>
          </div>

          <hr className="my-4" />

          <section>
            <div className={currentTemplate.sectionTitle}>Professional Summary</div>
            <p className="mt-2 text-sm">{formData.summary || "Add a professional summary or generate using AI."}</p>
          </section>

          <section className="mt-4">
            <div className={currentTemplate.sectionTitle}>Internships</div>
            {formData.internships.map((intern, i) => (
              <div key={i} className="mt-2 text-sm">
                <div className="font-semibold">{intern.company || "Company"} — {intern.role || "Role"}</div>
                <div className="text-xs text-gray-600">{intern.type}{intern.duration && ` • ${intern.duration}`}</div>
              </div>
            ))}
          </section>

          <section className="mt-4">
            <div className={currentTemplate.sectionTitle}>Projects</div>
            {formData.projects.map((proj, i) => (
              <div key={i} className="mt-2 text-sm">
                <div className="font-semibold">{proj.title || "Project Title"}</div>
                <div className="text-xs text-gray-600">{proj.description}</div>
                {proj.github && (<a href={proj.github} target="_blank" rel="noreferrer" className="text-sm underline inline-block mt-1">{proj.github}</a>)}
              </div>
            ))}
          </section>

          <section className="mt-4">
            <div className={currentTemplate.sectionTitle}>Skills</div>
            <p className="mt-2 text-sm">{formData.skills}</p>
          </section>

          <section className="mt-4">
            <div className={currentTemplate.sectionTitle}>Achievements & Certifications</div>
            <p className="mt-2 text-sm">{formData.achievements} {formData.certifications && ` • ${formData.certifications}`}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
