// export default function Navbar() {
//   return (
//     <div className="h-16 bg-white shadow flex items-center px-6 justify-between">
//       <h2 className="text-xl font-semibold">Welcome, Recruiter</h2>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         Logout
//       </button>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Check who is logged in
    if (localStorage.getItem("recruiter")) {
      localStorage.removeItem("recruiter");
    } else if (localStorage.getItem("student")) {
      localStorage.removeItem("student");
    }

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center px-6 justify-between">
      <h2 className="text-xl font-semibold text-gray-700">Welcome, Recruiter</h2>

      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
