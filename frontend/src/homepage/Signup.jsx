import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import HomePage from "./Home";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  // 💠 Blue animated floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 4,
      duration: 5 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

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
    if (password.length < minLength) return "At least 8 characters required.";
    if (!hasUpper) return "Include at least one uppercase letter.";
    if (!hasLower) return "Include at least one lowercase letter.";
    if (!hasNumber) return "Include at least one number.";
    if (!hasSpecial) return "Include at least one special character.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) return setErrorMsg("Enter your full name.");
    if (!formData.email.includes("@"))
      return setErrorMsg("Enter a valid email address.");

    const passwordError = validatePassword(formData.password);
    if (passwordError) return setErrorMsg(passwordError);

    setLoading(true);
    const endpoint =
      formData.role === "recruiter"
        ? "http://localhost:8090/recruiter/register"
        : "http://localhost:8090/student/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem(
          `${formData.role}_user`,
          JSON.stringify({ email: data.email, name: data.name })
        );
        navigate(formData.role === "recruiter" ? "/recruiter/dashboard" : "/student");
      } else {
        setErrorMsg(data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* 🌌 Background HomePage with subtle blur */}
      <div className="absolute inset-0 opacity-80 blur-[2px] pointer-events-none">
        <HomePage />
      </div>

      {/* 💫 Floating Blue Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-blue-400/50 shadow-lg"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: ["0%", "20%", "0%"],
              x: ["0%", "10%", "0%"],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 💎 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-white/30 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl p-8 w-full max-w-sm"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-6"
        >
          Join the Portal 🚀
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 🧍 Name Field */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full px-3 pt-4 pb-2 border border-gray-300 rounded-lg bg-white/60 
                         focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Name
            </label>
          </div>

          {/* 📧 Email Field */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full px-3 pt-4 pb-2 border border-gray-300 rounded-lg bg-white/60 
                         focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          {/* 🔒 Password Field (fixed eye icon) */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full px-3 pt-4 pb-2 border border-gray-300 rounded-lg bg-white/60 
                         focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-600 transition"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* 🧩 Role Selector */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/60 
                       focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </motion.select>

          {/* ⚠️ Error Message */}
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

          {/* 🌈 Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(90deg, #2563eb, #1e40af, #2563eb)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r 
            from-blue-500 via-sky-500 to-blue-600 shadow-lg 
            hover:shadow-blue-400/50 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>

          {/* 🔗 Login Link */}
          <p className="text-center mt-3 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline hover:text-sky-500"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
