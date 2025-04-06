import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard_/Dashboard.jsx";
import Hackathons from "./Hackathons";
import HackathonDetails from "../HackathonDeatils";
import Resources from "./Resources";
import ResourcePage from "./ResourcePage";
import Community from "../Dashboard_/Community.jsx";
import Profile from "../Dashboard_/Profile/Profile.jsx";
import Sidebar from "../../Component/Sidebar.jsx"; // Import your Sidebar component
import ProfileView from "./Profile/ProfileView.jsx";

const DashApp = () => {
  const location = useLocation();

  // Helper function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/dashboard") {
      return "Dashboard";
    }
    
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    // For paths with dynamic params like /resources/:slug
    if (lastSegment.includes(":") || !isNaN(lastSegment)) {
      // Get the parent route name
      const parentSegment = pathSegments[pathSegments.length - 2];
      return parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1);
    }
    
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="dash-container flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="routes flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {/* Default dashboard route */}
            <Route index element={<Dashboard />} />
            
            {/* Main routes */}
            <Route path="hackathons" element={<Hackathons />} />
            <Route path="hackathon/:id" element={<HackathonDetails />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:slug" element={<ResourcePage />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/view" element={<ProfileView />} />
            
            {/* Routes for other sidebar items */}
            <Route path="products" element={<div>Products Page</div>} />
            <Route path="tags" element={<div>Tags Page</div>} />
            <Route path="analytics" element={<div>Analytics Page</div>} />
            
            {/* Fallback route for dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashApp;