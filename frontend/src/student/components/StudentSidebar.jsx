import { NavLink, useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-md transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  // ✅ Create Resume function (we’ll later integrate pdfshift API)
  const handleCreateResume = () => {
  navigate("/student/create-resume"); // Redirect to ResumeForm page
};

  return (
    <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col justify-between">
      <div>
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Student Portal</h2>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to="/student" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/student/jobs" className={linkClass}>
            Browse Jobs
          </NavLink>
          <NavLink to="/student/applications" className={linkClass}>
            My Applications
          </NavLink>
          <NavLink to="/student/profile" className={linkClass}>
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Footer buttons */}
      <div className="p-4 border-t space-y-2">
        <button
          onClick={handleCreateResume}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Create Resume
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
