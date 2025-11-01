import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/Home";

// === Recruiter Imports ===
import Navbar from "./recruiter/components/Navbar";
import Sidebar from "./recruiter/components/Sidebar";
import RecruiterDashboard from "./recruiter/pages/Dashboard";
import ManageJobs from "./recruiter/pages/ManageJobs";
import PostJob from "./recruiter/pages/PostJob";
import Shortlisted from "./recruiter/pages/Shortlisted";
import ViewApplicants from "./recruiter/pages/ViewApplicants";
import RecruiterLayout from "./recruiter/layout/RecruiterLayout";

// === Student Imports ===
import StudentDashboard from "./student/pages/StudentDashboard";
import StudentHome from "./student/pages/StudentHome";
import JobsList from "./student/pages/JobsList";
import JobDetails from "./student/pages/JobDetails";
import MyApplications from "./student/pages/MyApplications";
import Profile from "./student/pages/Profile";
import Login from "./homepage/Login";
import Signup from "./homepage/Signup";
import ResumeForm from "./student/pages/ResumeForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* ===== Homepage ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ===== Recruiter Portal ===== */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applicants" element={<ViewApplicants />} />
          <Route path="shortlisted" element={<Shortlisted />} />
        </Route>

        {/* ===== Student Portal ===== */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<StudentHome />} />
          <Route path="jobs" element={<JobsList />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="create-resume" element={<ResumeForm />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
