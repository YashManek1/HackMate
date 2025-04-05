import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Community from "./Community";
import Profile from "./Profile/Profile";
import Hackathons from "./Hackathons";

const DashApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "A",
  };

  const navigation = [
    { name: "Dashboard", path: "/", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
    { name: "Hackathons", path: "/hackathons", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a1 1 0 10-2 0v7a1 1 0 001 1h7a1 1 0 001-1V6a1 1 0 10-2 0v7h-5V6zm-2-5a1 1 0 00-1-1H6a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V1zM1 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1H1z" /></svg> },
    { name: "Resources", path: "/resources", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.66 0-3.24.804-4.24 2.207C.291 7.541 0 9.027 0 10.5c0 1.473.291 2.959 1.26 4.293C2.26 15.196 3.84 16 5.5 16c.684 0 1.35-.082 2-.227V14.5a1 1 0 01-1-1v-3a1 1 0 012 0v3a1 1 0 001 1h1a1 1 0 001-1v-3a1 1 0 012 0v3a1 1 0 001 1h1c1.66 0 3.24-.804 4.24-2.207C19.709 13.459 20 11.973 20 10.5s-.291-2.959-1.26-4.293A7.968 7.968 0 0014.5 4c-1.66 0-3.24.804-4.24 2.207A7.503 7.503 0 009 4.804z" /></svg> },
    { name: "Community", path: "/community", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg> },
    { name: "Profile", path: "/profile", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg> },
  ];

  return (
    <div className="dash-container flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">HackMate</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${isActive ? "bg-blue-50 text-blue-600" : ""}`
              }
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
              {user.avatar}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="routes flex-1 flex flex-col overflow-hidden ml-0 md:ml-64">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">
            {location.pathname === "/" ? "Dashboard" : navigation.find((item) => item.path === location.pathname)?.name || "Page"}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {/* Default route - redirect to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hackathons/*" element={<Hackathons />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashApp;