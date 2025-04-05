import React, { useState, useEffect, useRef } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';

const FormModal = ({ isOpen, onClose, modalType, editData, isEditing, onSave }) => {
  // Ref for modal content
  const modalRef = useRef(null);
  
  // State for education form
  const [educationType, setEducationType] = useState('College');
  
  // State for form data
  const [formData, setFormData] = useState(() => getInitialFormData(modalType));
  
  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
      if (modalType === 'Education' && editData.type) {
        setEducationType(editData.type);
      }
    } else {
      setFormData(getInitialFormData(modalType));
      if (modalType === 'Education') {
        setEducationType('College');
      }
    }
  }, [modalType, editData, isEditing]);
  
  // Adjust modal position if it goes out of viewport
  useEffect(() => {
    if (isOpen && modalRef.current) {
      setTimeout(() => {
        const modalElement = modalRef.current;
        const rect = modalElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If modal is taller than viewport, make it scrollable
        if (rect.height > windowHeight - 40) {
          modalElement.style.maxHeight = `${windowHeight - 40}px`;
          modalElement.style.overflowY = 'auto';
        } else {
          modalElement.style.maxHeight = '';
          modalElement.style.overflowY = '';
        }
      }, 100);
    }
  }, [isOpen, modalType]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Add education type to education data
    if (modalType === 'Education') {
      onSave({ ...formData, type: educationType });
    } else {
      onSave(formData);
    }
    
    // Reset form
    setFormData(getInitialFormData(modalType));
  };
  
  // Get initial form data based on modal type
  function getInitialFormData(type) {
    switch (type) {
      case 'Education':
        return {
          university: '',
          school: '',
          fieldOfStudy: '',
          degree: '',
          grade: '',
          startYear: '',
          endYear: ''
        };
      case 'Projects':
        return {
          title: '',
          description: '',
          technologies: '',
          url: '',
          startDate: '',
          endDate: ''
        };
      case 'Work Experience':
        return {
          company: '',
          position: '',
          employmentType: 'Full-time',
          description: '',
          startDate: '',
          endDate: ''
        };
      case 'Position of Responsibility':
        return {
          title: '',
          organization: '',
          description: '',
          startDate: '',
          endDate: ''
        };
      case 'Achievements':
        return {
          title: '',
          issuer: '',
          description: '',
          date: ''
        };
      case 'Certifications':
        return {
          title: '',
          issuer: '',
          description: '',
          date: '',
          url: ''
        };
      default:
        return {};
    }
  }

  // Render different forms based on modalType
  const renderFormContent = () => {
    switch (modalType) {
      case 'Education':
        return (
          <>
            {/* Education Toggle */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center bg-[#f6ebff] rounded-full p-1">
                <button 
                  className={`px-6 py-1 rounded-full ${
                    educationType === 'College' ? "bg-[#340062] text-white" : "text-[#11014c]"
                  }`}
                  onClick={() => setEducationType('College')}
                >
                  College
                </button>
                <button 
                  className={`px-6 py-1 rounded-full ${
                    educationType === 'School' ? "bg-[#340062] text-white" : "text-[#11014c]"
                  }`}
                  onClick={() => setEducationType('School')}
                >
                  School
                </button>
              </div>
            </div>

            {/* Education Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#11014c] mb-2">
                  {educationType === 'College' ? 'University Name' : 'School Name'}
                </label>
                <input 
                  type="text" 
                  name={educationType === 'College' ? 'university' : 'school'}
                  value={educationType === 'College' ? formData.university || '' : formData.school || ''}
                  onChange={handleInputChange}
                  placeholder={`Type ${educationType} Name`}
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
              </div>
              <div>
                <label className="block text-[#11014c] mb-2">Field of Study</label>
                <input 
                  type="text" 
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy || ''}
                  onChange={handleInputChange}
                  placeholder="Type field of study" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
              </div>
              
              <div>
                <label className="block text-[#11014c] mb-2">Degree</label>
                <select 
                  name="degree"
                  value={formData.degree || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                >
                  <option value="">Choose your degree</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E.">B.E.</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>
              <div>
                <label className="block text-[#11014c] mb-2">Grade (out of 10)</label>
                <input 
                  type="text" 
                  name="grade"
                  value={formData.grade || ''}
                  onChange={handleInputChange}
                  placeholder="Enter Grade(cgpa)" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
              </div>
              
              <div>
                <label className="block text-[#11014c] mb-2">Start Year</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="startYear"
                    value={formData.startYear || ''}
                    onChange={handleInputChange}
                    placeholder="Choose Starting Year" 
                    className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                  />
                  <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
                </div>
              </div>
              <div>
                <label className="block text-[#11014c] mb-2">End Year</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="endYear"
                    value={formData.endYear || ''}
                    onChange={handleInputChange}
                    placeholder="Choose Ending Year" 
                    className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                  />
                  <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
                </div>
              </div>
            </div>
          </>
        );
      
      case 'Projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Project Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Enter project title" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Project Description</label>
              <textarea 
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Describe your project" 
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Technologies Used</label>
              <input 
                type="text" 
                name="technologies"
                value={formData.technologies || ''}
                onChange={handleInputChange}
                placeholder="e.g., React, Node.js, MongoDB" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Project URL</label>
              <input 
                type="text" 
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                placeholder="https://..." 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Start Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleInputChange}
                  placeholder="Choose Start Date" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">End Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleInputChange}
                  placeholder="Choose End Date" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
          </div>
        );
      
      case 'Work Experience':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Company Name</label>
              <input 
                type="text" 
                name="company"
                value={formData.company || ''}
                onChange={handleInputChange}
                placeholder="Enter company name" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Position</label>
              <input 
                type="text" 
                name="position"
                value={formData.position || ''}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Employment Type</label>
              <select 
                name="employmentType"
                value={formData.employmentType || 'Full-time'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Start Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleInputChange}
                  placeholder="Choose Start Date" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">End Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleInputChange}
                  placeholder="Choose End Date" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities" 
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );
      
      case 'Position of Responsibility':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Title/Position</label>
              <input 
                type="text" 
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Enter position title" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Organization</label>
              <input 
                type="text" 
                name="organization"
                value={formData.organization || ''}
                onChange={handleInputChange}
                placeholder="Organization name" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">Start Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleInputChange}
                  placeholder="Choose Start Date" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div>
              <label className="block text-[#11014c] mb-2">End Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleInputChange}
                  placeholder="Choose End Date" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities" 
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );
      
      case 'Achievements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Achievement Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Enter achievement title" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Issuing Organization</label>
              <input 
                type="text" 
                name="issuer"
                value={formData.issuer || ''}
                onChange={handleInputChange}
                placeholder="Who awarded this achievement?" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="date"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  placeholder="Date of achievement" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Describe your achievement" 
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );
      
      case 'Certifications':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Certification Name</label>
              <input 
                type="text" 
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Enter certification name" 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Issuing Organization</label>
              <input 
                type="text" 
                name="issuer"
                value={formData.issuer || ''}
                onChange={handleInputChange} 
                placeholder="e.g., Coursera, Udemy, etc." 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="date"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  placeholder="Date of certification" 
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
                />
                <FiCalendar className="absolute right-3 top-3 text-[#11014c] opacity-50" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Credential URL</label>
              <input 
                type="text" 
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                placeholder="https://..." 
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Describe what you learned" 
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );
      
      default:
        return <p className="text-[#11014c]">Form content for {modalType}</p>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl my-4 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-[#b6cbff] flex justify-between items-center flex-shrink-0">
          <h3 className="font-bold text-lg text-[#340062]">
            {isEditing ? `Edit ${modalType}` : `Add ${modalType}`}
          </h3>
          <button onClick={onClose} className="text-[#11014c] hover:text-[#340062]">
            <FiX size={20} />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {renderFormContent()}
        </div>
        
        {/* Modal Footer */}
        <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-[#11014c]"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#340062] text-white font-medium rounded"
          >
            {isEditing ? 'Update Details' : 'Save Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;