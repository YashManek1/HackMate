import React, { useState } from 'react';
import { FiEdit2, FiCalendar, FiPlus, FiExternalLink, FiTrash2 } from 'react-icons/fi';

const ProfileSection = ({ onOpenModal, onEditItem, onDeleteItem, profileData }) => {
  const [activeTab, setActiveTab] = useState('Education');
  
  const tabs = [
    'Education', 
    'Projects', 
    'Position of Responsibility', 
    'Work Experience', 
    'Achievements', 
    'Certifications'
  ];

  // Function to render content based on active tab and data
  const renderTabContent = () => {
    const tabData = profileData[activeTab];
    
    if (!tabData || tabData.length === 0) {
      // Show "Add New" button if no data exists
      return (
        <div className="text-center py-8">
          <div className="bg-[#f6ebff] inline-block p-4 rounded-full mb-4">
            {renderTabIcon(activeTab)}
          </div>
          <h3 className="font-bold text-lg mb-1 text-[#340062]">Add {activeTab} Details</h3>
          <p className="text-[#11014c] opacity-70 mb-4">{getTabDescription(activeTab)}</p>
          <button 
            onClick={() => onOpenModal(activeTab)}
            className="inline-flex items-center px-4 py-2 border border-[#340062] text-[#340062] rounded"
          >
            <FiPlus className="mr-2" /> Add new
          </button>
        </div>
      );
    } else {
      // Show data if it exists
      return (
        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#340062]">{activeTab}</h3>
            <button 
              onClick={() => onOpenModal(activeTab)}
              className="inline-flex items-center px-3 py-1 border border-[#340062] text-[#340062] rounded text-sm"
            >
              <FiPlus className="mr-1" /> Add More
            </button>
          </div>
          
          {/* Render data based on tab type */}
          {renderDataCards(tabData, activeTab)}
        </div>
      );
    }
  };
  
  // Helper function to get tab description
  const getTabDescription = (tab) => {
    switch(tab) {
      case 'Education': return 'Your school / college details';
      case 'Projects': return 'Showcase your projects and skills';
      case 'Position of Responsibility': return 'Leadership roles and responsibilities';
      case 'Work Experience': return 'Your internships and job details';
      case 'Achievements': return 'Your awards and recognitions';
      case 'Certifications': return 'Professional certifications and courses';
      default: return '';
    }
  };
  
  // Helper function to render tab icons
  const renderTabIcon = (tab) => {
    switch(tab) {
      case 'Education':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5V19H3V5H21ZM21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM14 17H6V15H14V17ZM18 13H6V11H18V13ZM18 9H6V7H18V9Z" fill="#340062"/>
          </svg>
        );
      case 'Projects':
        return <FiExternalLink size={24} color="#340062" />;
      case 'Work Experience':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" fill="#340062"/>
          </svg>
        );
      default:
        return <FiEdit2 size={24} color="#340062" />;
    }
  };
  
  // Function to render data cards based on tab type
  const renderDataCards = (data, tabType) => {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border border-[#b6cbff] rounded-lg p-6 hover:shadow-md transition-shadow relative group">
            {/* Edit/Delete controls - shown on hover */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEditItem(tabType, index, item)}
                className="bg-[#f6ebff] p-2 rounded-full text-[#340062] hover:bg-[#340062] hover:text-white transition"
                aria-label="Edit"
              >
                <FiEdit2 size={16} />
              </button>
              <button 
                onClick={() => onDeleteItem(tabType, index)}
                className="bg-[#f6ebff] p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition"
                aria-label="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            
            {tabType === 'Education' && (
              <div>
                <h4 className="font-bold text-[#340062]">{item.university || item.school}</h4>
                <p className="text-[#11014c]">{item.degree} in {item.fieldOfStudy}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-[#11014c] opacity-70">{item.startYear} - {item.endYear}</span>
                  <span className="text-sm text-[#11014c]">Grade: {item.grade}</span>
                </div>
              </div>
            )}
            
            {tabType === 'Projects' && (
              <div>
                <h4 className="font-bold text-[#340062]">{item.title}</h4>
                <p className="text-[#11014c] my-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 my-2">
                  {item.technologies && item.technologies.split(',').map((tech, i) => (
                    <span key={i} className="bg-[#f6ebff] px-3 py-1 rounded-full text-xs text-[#340062]">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-[#11014c] opacity-70">{item.startDate} - {item.endDate}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#340062] flex items-center">
                      View Project <FiExternalLink className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}
            
            {tabType === 'Work Experience' && (
              <div>
                <h4 className="font-bold text-[#340062]">{item.company}</h4>
                <p className="text-[#11014c]">{item.position} • {item.employmentType}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description}</p>
                <span className="text-sm text-[#11014c] opacity-70">{item.startDate} - {item.endDate}</span>
              </div>
            )}
            
            {tabType === 'Position of Responsibility' && (
              <div>
                <h4 className="font-bold text-[#340062]">{item.title}</h4>
                <p className="text-[#11014c]">{item.organization}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description}</p>
                <span className="text-sm text-[#11014c] opacity-70">{item.startDate} - {item.endDate}</span>
              </div>
            )}
            
            {tabType === 'Achievements' && (
              <div>
                <h4 className="font-bold text-[#340062]">{item.title}</h4>
                <p className="text-[#11014c]">{item.issuer}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description}</p>
                <span className="text-sm text-[#11014c] opacity-70">{item.date}</span>
              </div>
            )}
            
            {tabType === 'Certifications' && (
              <div>
                <h4 className="font-bold text-[#340062]">{item.title}</h4>
                <p className="text-[#11014c]">{item.issuer}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description}</p>
                <div className="flex justify-between">
                  <span className="text-sm text-[#11014c] opacity-70">{item.date}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#340062] flex items-center">
                      View Certificate <FiExternalLink className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f6ebff] bg-opacity-30 min-h-screen font-dmsans">
      {/* Header Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-[#340062] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#340062]">Tanish Shah</h1>
              <p className="text-[#11014c]">Frontend Developer</p>
              <p className="text-sm text-[#11014c] opacity-70">Dwarkadas J. Sanghvi College of Engineering • 2027 Pass out</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button className="px-6 py-2 border border-[#340062] text-[#340062] font-medium rounded-md">
              Edit
            </button>
            <button className="px-6 py-2 bg-[#340062] text-white font-medium rounded-md">
              Your Resume
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <nav className="flex border-b border-[#b6cbff]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 font-medium ${
                    activeTab === tab
                      ? "text-[#340062] border-b-2 border-[#340062]"
                      : "text-[#11014c] opacity-70"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Profile Health Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#340062]">Profile Health:</h3>
          <span className={`${calculateProfileHealth() > 50 ? "text-[#340062]" : "text-[#FF6B6B]"}`}>
            {calculateProfileHealth() > 75 ? "EXCELLENT" : calculateProfileHealth() > 50 ? "GOOD" : "AVERAGE"}
          </span>
        </div>
        
        <p className="text-sm mb-3 text-[#11014c]">
          <span className="font-medium">Students with atleast 90% profile completion</span> have a better chance of getting selected!
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#f6ebff] rounded-full h-2 mb-1">
          <div 
            className={`h-2 rounded-full ${calculateProfileHealth() > 50 ? "bg-[#340062]" : "bg-[#FF6B6B]"}`} 
            style={{width: `${calculateProfileHealth()}%`}}
          ></div>
        </div>
        <div className="flex justify-between mb-6">
          <span className={`text-sm font-medium ${calculateProfileHealth() > 50 ? "text-[#340062]" : "text-[#FF6B6B]"}`}>
            {calculateProfileHealth()}% completed
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full mx-1 mt-1 ${
                  i < Math.ceil(calculateProfileHealth() / 20) ? 
                    (calculateProfileHealth() > 50 ? "bg-[#340062]" : "bg-[#FF6B6B]") : 
                    "bg-[#f6ebff]"
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <button className={`text-sm font-medium ${calculateProfileHealth() > 50 ? "text-[#340062]" : "text-[#FF6B6B]"}`}>
          {getSuggestionForProfileCompletion()}
        </button>
      </div>

      {/* Other sections - Tagline, Skills, etc. */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#340062]">Tagline</h3>
          <button className="text-[#340062] border border-[#340062] rounded p-1">
            <FiEdit2 size={16} />
          </button>
        </div>
        <p className="text-[#11014c] opacity-70">No Tagline Added</p>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#340062]">Skills</h3>
          <button className="text-[#340062] border border-[#340062] rounded p-1">
            <FiEdit2 size={16} />
          </button>
        </div>
        <p className="text-[#11014c] opacity-70">No Skills Added</p>
      </div>
    </div>
  );
  
  // Function to calculate profile health percentage
  function calculateProfileHealth() {
    const totalSections = 8; // Tabs + Tagline + Skills
    let completedSections = 0;
    
    // Check tabs with data
    Object.values(profileData).forEach(data => {
      if (data.length > 0) completedSections++;
    });
    
    // Hard-coded as 0 for now (Tagline and Skills)
    
    return Math.round((completedSections / totalSections) * 100);
  }
  
  // Function to provide suggestion for profile completion
  function getSuggestionForProfileCompletion() {
    if (!profileData.Projects || profileData.Projects.length === 0) {
      return "Add 1 Project to improve your profile health";
    } else if (!profileData.Education || profileData.Education.length === 0) {
      return "Add your Education details to improve your profile health";
    } else if (!profileData['Work Experience'] || profileData['Work Experience'].length === 0) {
      return "Add Work Experience to improve your profile health";
    }
    return "Complete your profile to improve visibility";
  }
};

export default ProfileSection;