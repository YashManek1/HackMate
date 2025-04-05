import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import hackathonData from "../Data/HackathonResource.js";

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  useEffect(() => {
    setLoading(true);
    // Make sure hackathonData is an array before trying to find an element
    if (Array.isArray(hackathonData)) {
      const found = hackathonData.find((h) => h.id === id);
      if (found) {
        setHackathon(found);
      }
    } else {
      console.error("hackathonData is not an array:", hackathonData);
    }
    setLoading(false);
  }, [id]);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    // Handle team creation logic here
    console.log({ teamName, teamDescription, hackathonId: id });
    setShowTeamModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-primary">
        <motion.div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-dark-primary"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-light-primary">
        <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Hackathon not found</h2>
        <motion.button
          onClick={() => navigate("/hackathons")}
          className="px-6 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Hackathons
        </motion.button>
      </div>
    );
  }

  const TeamModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-light-secondary2 rounded-xl p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-bold mb-4 text-dark-primary font-poppins">Create Team</h3>
        <form onSubmit={handleCreateTeam}>
          <div className="mb-4">
            <label className="block text-dark-secondary1 mb-2 font-dmsans">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg bg-light-primary focus:ring-2 focus:ring-dark-primary text-dark-primary font-dmsans"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-dark-secondary1 mb-2 font-dmsans">Description</label>
            <textarea
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg bg-light-primary focus:ring-2 focus:ring-dark-primary text-dark-primary font-dmsans h-32 resize-none"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              onClick={() => setShowTeamModal(false)}
              className="px-4 py-2 text-dark-secondary1 hover:text-dark-primary font-poppins"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Team
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-light-primary text-dark-primary font-outfit">
      <motion.button
        onClick={() => navigate("/hackathons")}
        className="flex items-center text-dark-primary hover:text-dark-secondary1 mb-4 font-poppins"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Back to Hackathons
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-dark-primary to-dark-secondary1 rounded-xl text-light-secondary2 p-6 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-2 font-poppins">{hackathon.name}</h1>
            <p className="mb-4 text-light-secondary1 font-dmsans">{hackathon.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {hackathon.domains && hackathon.domains.map((domain) => (
                <span key={domain} className="bg-light-secondary2 bg-opacity-50 px-3 py-1 rounded-full text-sm font-dmsans">
                  {domain}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-dmsans">
                {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => setShowTeamModal(true)}
          className="w-full md:w-auto px-6 py-3 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Team
        </motion.button>

        <div className="mb-8">
          <div className="border-b border-dark-secondary1">
            <nav className="flex space-x-8">
              {["overview", "rules", "timeline"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-dark-primary text-dark-primary"
                      : "border-transparent text-dark-secondary1 hover:text-dark-primary"
                  } font-poppins`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                className="bg-light-secondary2 rounded-xl shadow-md p-6 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">About</h2>
                <p className="text-dark-secondary1 font-dmsans">{hackathon.description}</p>
              </motion.div>
              
              {hackathon.prizeDetails && (
                <motion.div
                  className="bg-light-secondary2 rounded-xl shadow-md p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Prizes</h2>
                  <pre className="text-dark-secondary1 font-dmsans whitespace-pre-wrap">
                    {JSON.stringify(hackathon.prizeDetails, null, 2)}
                  </pre>
                </motion.div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                className="bg-light-secondary2 rounded-xl shadow-md p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Details</h2>
                <p className="text-dark-secondary1 font-dmsans"><strong>Location:</strong> {hackathon.location}</p>
                <p className="text-dark-secondary1 font-dmsans">
                  <strong>Created:</strong> {hackathon.createdAt && new Date(hackathon.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "rules" && hackathon.rules && (
          <motion.div
            className="bg-light-secondary2 rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Rules</h2>
            <div className="text-dark-secondary1 font-dmsans whitespace-pre-wrap">
              {hackathon.rules}
            </div>
          </motion.div>
        )}

        {activeTab === "timeline" && hackathon.timeline && (
          <motion.div
            className="bg-light-secondary2 rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Timeline</h2>
            <div className="space-y-4">
              {hackathon.timeline.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-4 w-4 rounded-full bg-dark-primary mt-1"></div>
                  <div className="ml-4">
                    <h3 className="font-medium text-dark-primary font-poppins">{event.title}</h3>
                    <p className="text-dark-secondary1 font-dmsans">{event.description}</p>
                    <p className="text-sm text-dark-secondary1 font-dmsans">{new Date(event.date).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {showTeamModal && <TeamModal />}
    </div>
  );
};

export default HackathonDetails;