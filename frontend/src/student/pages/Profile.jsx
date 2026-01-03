import React, { useState, useEffect } from "react";

const Profile = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    cgpa: "",
    gender: "",
    dept: "",
    college: "",
    password: "",
  });

  const [manualCollege, setManualCollege] = useState("");

 useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("student_token"));
  if (!stored || !stored.user || !stored.user.email) {
    alert("No login data found. Please login first.");
    return;
  }

  const email = stored.user.email;

  const fetchStudent = async () => {
    try {
      const res = await fetch(`http://localhost:8090/student/${email}`);
      if (res.ok) {
        const student = await res.json();
        setFormData(student);
      } else {
        alert("Unable to fetch profile. Please try again later.");
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      alert("Server error while fetching data.");
    }
  };

  fetchStudent();
}, []);


  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Validate strong password
  const isStrongPassword = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  // ✅ Handle form submit (PUT update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!/^\d{10,}$/.test(formData.contact)) {
      alert("Contact number must be at least 10 digits!");
      return;
    }

    if (!isStrongPassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // If user selected "Others", save manual college name
    const finalCollege =
      formData.college === "Others (Enter manually)"
        ? manualCollege
        : formData.college;

    const updatedData = { ...formData, college: finalCollege };

    try {
      const res = await fetch(
        `http://localhost:8090/student/update/${formData.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        const updated = await res.json();

        const stored = JSON.parse(localStorage.getItem("student_token"));
        localStorage.setItem(
          "student_token",
          JSON.stringify({
            token: stored.token,
            user: updatedData, // updated info
          })
        );

        // ⭐ VERY IMPORTANT — mark profile completed
       localStorage.setItem("student_profile_completed", "true");

        alert("Profile updated successfully!");
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error updating student:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email (Not Editable)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Contact Number
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter 10-digit number"
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CGPA */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            CGPA
          </label>
          <input
            type="text"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* College */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            College
          </label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select College</option>
            {rajasthanColleges.map((college, idx) => (
              <option key={idx} value={college}>
                {college}
              </option>
            ))}
          </select>

          {formData.college === "Others (Enter manually)" && (
            <input
              type="text"
              placeholder="Enter your college name"
              value={manualCollege}
              onChange={(e) => setManualCollege(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Department
          </label>
          <select
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            {branches.map((branch, idx) => (
              <option key={idx} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Strong password required"
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
