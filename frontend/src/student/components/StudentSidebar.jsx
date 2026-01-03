import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 

const StudentSidebar = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false); // ✅ toggle state
  const [user, setUser] = useState({ email: "", profilePic: "" });

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  // ✅ Create Resume
  const handleCreateResume = () => {
    navigate("/student/create-resume");
  };

  // ✅ Fetch user data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        email: storedUser.email || "student@example.com",
        profilePic:
          storedUser.profilePic ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      });
    }
  }, []);


  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white border-r shadow-sm hidden md:flex flex-col justify-between transition-all duration-300`}
    >
      {/* Header */}
      <div>
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-semibold whitespace-nowrap">
              Student Portal
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <Menu size={22} /> : <X size={22} />}
          </button>
        </div>

        {/* Profile Section */}
        {!collapsed && (
          <div className="flex flex-col items-end p-4 border-b relative">
            {/* ✅ File input (hidden) */}
            <input
              type="file"
              accept="image/*"
              id="profilePicInput"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                // Convert image to Base64 (optional if you’re not uploading to backend yet)
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64Image = reader.result;

                  // Save locally (or send to backend)
                  const updatedUser = { ...user, profilePic: base64Image };
                  localStorage.setItem("studentUser", JSON.stringify(updatedUser));

                  // Update React state
                  setUser(updatedUser);
                };
                reader.readAsDataURL(file);
              }}
            />

            {/* ✅ Profile Picture */}
            <div
              className="relative cursor-pointer group"
              onClick={() => document.getElementById("profilePicInput").click()}
            >
              {user?.profilePic && user.profilePic.trim() !== "" ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                  {user?.name ? user.name[0].toUpperCase() : "?"}
                </div>
              )}

              {/* Hover overlay text */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-xs text-white">Edit</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-1 truncate max-w-[120px]">
              {user.email}
            </p>
          </div>
        )}


        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          <NavLink to="/student" end className={linkClass}>
            {!collapsed && <span>Dashboard</span>}
            {collapsed && <i className="bi bi-speedometer2"></i>}
          </NavLink>
          <NavLink to="/student/jobs" className={linkClass}>                                                                        
            {!collapsed && <span>Browse Jobs</span>}
          </NavLink>
          <NavLink to="/student/applications" className={linkClass}>
            {!collapsed && <span>My Applications</span>}
          </NavLink>
          <NavLink to="/student/profile" className={linkClass}>
            {!collapsed && <span>Profile</span>}
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        {!collapsed && (
          <>
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
          </>
        )}
      </div>
    </aside>
  );
};

export default StudentSidebar;
