import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


//deals with submission of json data to springboot applicaton
//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:8090/student/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Saved student:", data);
//       // Store only identifier (for backend fetch)
//      localStorage.setItem("student", JSON.stringify({ email: data.email }));
//       navigate("/student/dashboard");
//     } else {
//       console.error("Error:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };


    const handleSubmit = async (e) => {
      e.preventDefault();

      // Dynamically decide which endpoint to call
      const endpoint =
        formData.role === "recruiter"
          ? "http://localhost:8090/recruiter/register"
          : "http://localhost:8090/student/register";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`Saved ${formData.role}:`, data);

          // Store only identifier (email) in localStorage
          localStorage.setItem(formData.role, JSON.stringify({ email: data.email }));

          // Navigate to the correct dashboard
          if (formData.role === "recruiter") {
            navigate("/recruiter/dashboard");
          } else {
            navigate("/student");
          }
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-sm border border-blue-100">
        <h4 className="text-center text-2xl font-bold text-blue-600 mb-6">Create Account</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="email" name="email" placeholder="Email"
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="password" name="password" placeholder="Password"
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" required />
          <select name="role" onChange={handleChange}
            className="w-full mb-4 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Sign Up</button>
          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
