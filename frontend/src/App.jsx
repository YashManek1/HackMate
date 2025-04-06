import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import DashApp from "./Pages/Dashboard_/DashApp.jsx";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import NotFound from "./Pages/NotFound.jsx";
import Home from "./Pages/Landing/Home.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { SidebarProvider } from "../src/Component/Sidebar.jsx"; // Import SidebarProvider
const App = () => {
  // Mock authentication (replace with real auth logic)
  const isAuthenticated = true;

  return (
    <div className="min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto relative transition-all scroll-smooth">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <SidebarProvider>
                <DashApp />
              </SidebarProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;