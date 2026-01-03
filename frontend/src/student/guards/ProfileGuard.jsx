import { Navigate } from "react-router-dom";

export default function ProfileGuard({ children }) {
  const completed = localStorage.getItem("student_profile_completed");

  // If profile not completed → redirect to profile page
  if (completed !== "true") {
    return <Navigate to="/student/profile" replace />;
  }

  return children;
}
