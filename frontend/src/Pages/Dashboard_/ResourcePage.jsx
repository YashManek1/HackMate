
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../../Component/DashboardLayout.jsx";
import {resources} from "../../Data/ResourceData.js";
import "../../Styles/Resources.css";

const ResourcePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = resources.find((res) => res.slug === slug);

  if (!resource) {
    navigate("/dashboard/notfound");
    return null;
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-[#340062] mb-6 font-poppins">
          {resource.title}
        </h1>
        <p className="text-gray-600 mb-10 font-dmsans text-lg">
          {resource.description}
        </p>
        <div className="space-y-6">
          {resource.items.map((item, index) => (
            <motion.div
              key={index}
              className="resource-item bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:bg-[#f6ebff] transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-[#340062] font-dmsans">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-1 font-dmsans">{item.description}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#340062] font-medium hover:underline flex items-center gap-1"
              >
                Visit <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ResourcePage;