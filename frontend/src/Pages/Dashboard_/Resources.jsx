// src/Pages/Resources.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../../Component/DashboardLayout.jsx";
import {resources} from "../../Data/ResourceData.js";
import "../../Styles/Resources.css";

const Resources = () => {
  const navigate = useNavigate();

  const handleCardClick = (slug) => {
    navigate(`/dashboard/resources/${slug}`);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-[#340062] mb-8 font-poppins">
          Resources Dashboard
        </h1>
        <p className="text-gray-600 mb-10 font-dmsans text-lg">
          Explore a curated collection of resources for developers across various domains.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              className="resource-card bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: resource.id * 0.1 }}
              onClick={() => handleCardClick(resource.slug)}
            >
              <h2 className="text-xl font-semibold text-[#340062] font-dmsans mb-3">
                {resource.title}
              </h2>
              <p className="text-gray-600 font-dmsans line-clamp-3">
                {resource.description}
              </p>
              <div className="mt-4 flex justify-end">
                <motion.span
                  className="text-[#340062] font-medium flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Explore <span>→</span>
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Resources;