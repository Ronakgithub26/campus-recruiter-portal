// import React, { useState } from "react";
// import {Link, useNavigate } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:8090/student/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Logged-in student:", data);

//         // ✅ Save to localStorage for later use (like in your useEffect)
//         localStorage.setItem("student", JSON.stringify(data));

//         // redirect to dashboard or profile
//         navigate("/student/dashboard");
//       } else {
//         alert("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
//       <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-sm border border-blue-100">
//         <h3 className="text-center text-2xl font-bold text-blue-600 mb-6">Student Login</h3>
//         <form onSubmit={handleSubmit}>
//           <input type="email" name="email" placeholder="Email"
//             onChange={handleChange}
//             className="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" required />
//           <input type="password" name="password" placeholder="Password"
//             onChange={handleChange}
//             className="w-full mb-4 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" required />
//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
//           <p className="text-center mt-3 text-sm">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-blue-600 font-semibold">Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </div>

//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student", // default
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pick API endpoint based on role
    const endpoint =
      formData.role === "recruiter"
        ? "http://localhost:8090/recruiter/login"
        : "http://localhost:8090/student/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`${formData.role} logged in:`, data);

        // store separately
        localStorage.setItem(formData.role, JSON.stringify(data));

        // redirect based on role
        if (formData.role === "student") navigate("/student");
        else navigate("/recruiter/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-sm border border-blue-100">
        <h3 className="text-center text-2xl font-bold text-blue-600 mb-6">
          Login
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full mb-3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full mb-4 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center mt-3 text-sm">
            Don’t have an account?{" "}
            <Link
              to={formData.role === "student" ? "/signup" : "/recruiter/signup"}
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
