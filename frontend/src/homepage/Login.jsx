import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "./Home"; // ✅ background component

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength)
      return "Password must be at least 8 characters.";
    if (!hasUpper) return "Include at least one uppercase letter.";
    if (!hasLower) return "Include at least one lowercase letter.";
    if (!hasNumber) return "Include at least one number.";
    if (!hasSpecial) return "Include at least one special character.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email.includes("@"))
      return setErrorMsg("Please enter a valid email address.");

    const passwordError = validatePassword(formData.password);
    if (passwordError) return setErrorMsg(passwordError);

    setLoading(true);
    const endpoint =
      formData.role === "recruiter"
        ? "http://localhost:8090/recruiter/login"
        : "http://localhost:8090/student/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(
          `${formData.role}_token`,
          JSON.stringify({ token: data.token, user: data.user })
        );
        navigate(
          formData.role === "student" ? "/student" : "/recruiter/dashboard"
        );
      } else {
        const errData = await res.json();
        setErrorMsg(errData.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 scale-105 blur-sm opacity-90 pointer-events-none">
        <HomePage />
      </div>

      {/* ✨ Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-white/40 to-indigo-200/50 backdrop-blur-[3px]" />

      {/* 💫 Floating Gradient Orbs */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* 💎 Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-sm hover:shadow-blue-200 transition-all duration-300"
      >
        {/* Header */}
        <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Log in to your account and continue your journey 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            >
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={formData.password}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none pr-10 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 transition"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errorMsg}
            </p>
          )}

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 rounded-xl text-white font-semibold shadow-md transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* Footer */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to={formData.role === "student" ? "/signup" : "/recruiter/signup"}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
