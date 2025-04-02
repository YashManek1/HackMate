import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#340062] mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md shadow border border-[#b6cbff]">
          <h2 className="text-lg font-semibold mb-2">Welcome Back</h2>
          <p className="text-gray-600">This is your main dashboard view.</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow border border-[#b6cbff]">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <p className="text-gray-600">Your key metrics at a glance.</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow border border-[#b6cbff]">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Latest updates from your account.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;