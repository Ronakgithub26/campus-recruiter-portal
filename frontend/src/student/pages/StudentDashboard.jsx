import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-6 overflow-auto">
        {/* top header */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome back 👋</div>
        </header>

        {/* content area where child routes render */}
        <div className="space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
