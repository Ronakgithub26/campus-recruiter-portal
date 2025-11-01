import React, { useState, useEffect } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    cgpa: "",
    gender: "",
    dept: "",
    password: "",
  });

  // ✅ Load student data (either from localStorage or backend)
  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      setFormData(storedStudent);
    } else {
      alert("No student data found. Please login first.");
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle form submit (PUT update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8090/student/update/${formData.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        localStorage.setItem("student", JSON.stringify(updated));
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

      {/* Profile Picture Section */}
      <div className="flex justify-end mb-4">
        <div className="text-center">
          <img
            src={formData.profilePic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mx-auto"
          />
          <label className="block text-sm text-blue-600 font-medium cursor-pointer mt-2">
            Change Photo
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, profilePic: URL.createObjectURL(e.target.files[0]) })
              }
              className="hidden"
            />
          </label>
        </div>
      </div>


      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email (Not Editable)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">CGPA</label>
          <input
            type="text"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Department</label>
          <input
            type="text"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
