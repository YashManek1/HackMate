import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import DashApp from "../../frontend/src/Pages/Dashboard_/DashApp.jsx";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Hackathons from "../src/Pages/Dashboard_/Hackathons.jsx";
import HackathonDetails from "../src/Pages/HackathonDeatils.jsx";
import Resources from "../src/Pages/Dashboard_/Resources.jsx";
import ResourcePage from "../src/Pages/Dashboard_/ResourcePage.jsx";
import Community from "../src/Pages/Dashboard_/Community.jsx";
import NotFound from "../src/Pages/NotFound.jsx";
import Home from "../src/Pages/Landing/Home.jsx";
import ScrollToTop from "../src/ScrollToTop.jsx";

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

          {/* Protected Routes (Dashboard and Nested Routes) */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashApp /> : <Navigate to="/login" />}
          >
            <Route index element={<Hackathons />} />
            <Route path="hackathons" element={<Hackathons />} />
            <Route path="hackathon/:id" element={<HackathonDetails />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:slug" element={<ResourcePage />} /> {/* Dynamic slug for resources */}
            <Route path="community" element={<Community />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  
  );
};

export default App;