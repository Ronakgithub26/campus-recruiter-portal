import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-200 via-white to-blue-100 overflow-hidden">
      {/* Navbar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-center px-8 py-5 bg-white/70 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-blue-100"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide drop-shadow-sm">
          Smart Campus Recruitment Portal
        </h1>
        <nav className="space-x-6 text-gray-700 font-medium hidden md:block">
          <a href="#home" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            About
          </a>
          <a
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-gray-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 hover:scale-105 transition"
          >
            Sign Up
          </a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-center flex-grow px-8 pt-40 pb-28 text-center md:text-left relative"
      >
        {/* Animated gradient background orb */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-32 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40 z-0"
        />

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 z-10"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-5 drop-shadow-sm">
            Empowering <span className="text-blue-600">Campus Placements</span>{" "}
            <br /> with Technology 🚀
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Streamline your recruitment process with our all-in-one platform —
            built for students, recruiters, and TPOs.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/student")}
              className="bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all"
            >
              Go to Student Portal
            </button>

            <button
              onClick={() => navigate("/recruiter")}
              className="border border-blue-600 text-blue-600 px-7 py-3 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all"
            >
              Go to Recruiter Portal
            </button>
          </div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="md:w-1/2 mt-16 md:mt-0 relative z-10 flex justify-center"
        >
          <motion.img
            src="https://static.vecteezy.com/system/resources/previews/002/136/504/large_2x/hiring-and-recruitment-concept-people-searching-candidate-for-a-new-employee-human-resource-recruitment-process-illustration-vector.jpg"
            alt="Campus Recruitment"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="rounded-3xl shadow-2xl w-full max-w-xl border border-blue-100 object-cover h-[420px] md:h-[500px]"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-6 -left-6 bg-white p-4 rounded-full shadow-xl"
          >
            <Sparkles className="text-yellow-500" size={30} />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-28 bg-gradient-to-r from-blue-50 to-blue-100"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 mb-16"
        >
          💡 Key Features
        </motion.h3>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 px-10">
          {[
            {
              icon: <Users size={50} className="text-blue-600 mb-4 mx-auto" />,
              title: "Student Profiles",
              desc: "Students can create resumes, upload documents, and apply to jobs easily.",
            },
            {
              icon: (
                <Briefcase size={50} className="text-blue-600 mb-4 mx-auto" />
              ),
              title: "Company Dashboard",
              desc: "Recruiters can post openings, shortlist candidates, and view analytics.",
            },
            {
              icon: (
                <CalendarDays
                  size={50}
                  className="text-blue-600 mb-4 mx-auto"
                />
              ),
              title: "Drive Management",
              desc: "Plan and manage placement drives with automated scheduling tools.",
            },
            {
              icon: (
                <ShieldCheck size={50} className="text-blue-600 mb-4 mx-auto" />
              ),
              title: "Admin Control",
              desc: "Admins monitor activities, manage users, and maintain transparency.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-white p-10 rounded-3xl shadow-lg text-center hover:shadow-2xl border border-blue-100 hover:border-blue-300 transition-all"
            >
              {f.icon}
              <h4 className="text-2xl font-semibold mb-3 text-gray-800">
                {f.title}
              </h4>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 px-10 text-center bg-gradient-to-b from-white to-blue-50"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-gray-800 mb-8"
        >
          About the Portal
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          The{" "}
          <span className="font-semibold text-blue-600">
            Smart Campus Recruitment Portal
          </span>{" "}
          bridges the gap between students and companies. It helps colleges
          manage recruitment drives with transparency, speed, and simplicity —
          making placements stress-free and efficient for everyone involved.
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="text-sm">
          © 2025 Campus Recruitment Portal | Developed by
          <span className="text-blue-400"> Manish</span>,
          <span className="text-blue-400"> Ronak</span>,
          <span className="text-blue-400"> Rozi</span> &
          <span className="text-blue-400"> Nikita</span>
        </p>
        <div className="mt-3 text-gray-400 text-xs">
          Built with ❤ using React.js, TailwindCSS, and Framer Motion.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
