import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import FormModal from './FormModal';

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Education');
  const [editIndex, setEditIndex] = useState(-1); // -1 means adding new, >= 0 means editing
  const [editData, setEditData] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ type: '', index: -1 });
  
  // State to store data for each tab
  const [profileData, setProfileData] = useState({
    Education: [],
    Projects: [],
    'Position of Responsibility': [],
    'Work Experience': [],
    Achievements: [],
    Certifications: []
  });
  
  // Function to open modal with specific type for adding new entry
  const openModalWithType = (type) => {
    setModalType(type);
    setEditIndex(-1);
    setEditData(null);
    setModalOpen(true);
  };
  
  // Function to open modal for editing an existing entry
  const openEditModal = (type, index, data) => {
    setModalType(type);
    setEditIndex(index);
    setEditData(data);
    setModalOpen(true);
  };
  
  // Function to open delete confirmation modal
  const openDeleteConfirm = (type, index) => {
    setDeleteInfo({ type, index });
    setConfirmDeleteOpen(true);
  };
  
  // Function to handle deletion of an entry
  const handleDeleteEntry = () => {
    const { type, index } = deleteInfo;
    
    setProfileData(prevData => {
      const updatedData = [...prevData[type]];
      updatedData.splice(index, 1);
      return {
        ...prevData,
        [type]: updatedData
      };
    });
    
    setConfirmDeleteOpen(false);
  };
  
  // Function to handle saving form data
  const handleSaveData = (type, newData) => {
    if (editIndex >= 0) {
      // Editing existing entry
      setProfileData(prevData => {
        const updatedData = [...prevData[type]];
        updatedData[editIndex] = newData;
        return {
          ...prevData,
          [type]: updatedData
        };
      });
    } else {
      // Adding new entry
      setProfileData(prevData => ({
        ...prevData,
        [type]: [...prevData[type], newData]
      }));
    }
    setModalOpen(false);
    setEditIndex(-1);
    setEditData(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Profile Section */}
      <ProfileSection 
        onOpenModal={openModalWithType} 
        onEditItem={openEditModal}
        onDeleteItem={openDeleteConfirm}
        profileData={profileData}
      />
      
      {/* Reusable Modal */}
      <FormModal 
        isOpen={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setEditIndex(-1);
          setEditData(null);
        }} 
        modalType={modalType}
        editData={editData}
        isEditing={editIndex >= 0}
        onSave={(data) => handleSaveData(modalType, data)}
      />
      
      {/* Delete Confirmation Modal */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-[#340062] mb-4">Confirm Deletion</h3>
            <p className="text-[#11014c] mb-6">
              Are you sure you want to delete this {deleteInfo.type} entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmDeleteOpen(false)} 
                className="px-4 py-2 border border-[#b6cbff] text-[#11014c] rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteEntry}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;