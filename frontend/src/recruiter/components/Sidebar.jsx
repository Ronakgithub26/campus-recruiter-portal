import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <h1 className="text-2xl font-bold p-6">Recruiter Portal</h1>
      <nav className="flex flex-col gap-2 p-4">
        <Link to="/recruiter/dashboard" className="p-2 rounded hover:bg-gray-200">
          Dashboard
        </Link>
        <Link to="/recruiter/post-job" className="p-2 rounded hover:bg-gray-200">
          Post Job
        </Link>
        <Link to="/recruiter/manage-jobs" className="p-2 rounded hover:bg-gray-200">
          Manage Jobs
        </Link>
        <Link to="/recruiter/view-applicants" className="p-2 rounded hover:bg-gray-200">
          View Applicants
        </Link>
        <Link to="/recruiter/shortlisted" className="p-2 rounded hover:bg-gray-200">
          Shortlisted
        </Link>
      </nav>
    </div>
  );
}
