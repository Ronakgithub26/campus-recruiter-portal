import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* Nested routes will render here */}
        </div>
      </div>
    </div>
  );
};

export default RecruiterLayout;
