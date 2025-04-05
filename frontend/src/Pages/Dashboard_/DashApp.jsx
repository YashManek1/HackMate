import React from 'react';
import { Sidebar } from '../../Component/Sidebar';
import Community from './Community';
import Dashboard from './Dashboard';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile/Profile';

const DashApp = () => {
  return (
    <div className="dash-container flex">
      <div className="sidebar">
        <Sidebar />
      </div>


      
      <div className="routes flex-1 overflow-y-auto">
        <Routes>
          {/* Default route - redirect to dashboard */}
          <Route index element={<Dashboard />} />
          
          <Route path="community" element={<Community />} />          
          <Route path="profile" element={<Profile />} />          
          
        </Routes>
      </div>
    </div>
  );
};

export default DashApp;