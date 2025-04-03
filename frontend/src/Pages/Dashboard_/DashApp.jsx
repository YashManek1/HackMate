import React from 'react';
import { Sidebar } from '../../Component/Sidebar';
import Community from './Community';
import Dashboard from './Dashboard';
import { Routes, Route, Navigate } from 'react-router-dom';

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
          
          {/* Dashboard routes */}
          <Route path="community" element={<Community />} />
          
          {/* Add these routes as you create the components */}
          <Route path="sales" element={<div className="p-6"><h1 className="text-2xl font-bold">Sales Dashboard</h1></div>} />
          <Route path="view" element={<div className="p-6"><h1 className="text-2xl font-bold">Site Preview</h1></div>} />
          <Route path="products" element={<div className="p-6"><h1 className="text-2xl font-bold">Products Management</h1></div>} />
          <Route path="tags" element={<div className="p-6"><h1 className="text-2xl font-bold">Tags Management</h1></div>} />
          <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics Dashboard</h1></div>} />
          
          {/* Fallback for any undefined dashboard routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashApp;