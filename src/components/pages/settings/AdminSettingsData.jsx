import React, { useState, useEffect } from 'react';
import { IoPersonCircle } from 'react-icons/io5';

const AdminSettings = () => {
  const initialAdminProfile = {
    id: 1,
    username: 'Admin',
    email: 'admin@admin',
    phone: '123-456-7890',
    password: '1234',
  };

  const [adminProfile, setAdminProfile] = useState(initialAdminProfile);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Fetch admin profile data from the server (replace with actual API call)
    // Mock API call is replaced with setting the initialAdminProfile
    setAdminProfile(initialAdminProfile);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    // Set initial values for fields in edit mode
    setNewUsername(adminProfile.username);
    setNewEmail(adminProfile.email);
    setNewPhone(adminProfile.phone);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset fields to original values
    setNewUsername('');
    setNewEmail('');
    setNewPhone('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveChanges = () => {
    if (newPassword === confirmPassword) {
      // Passwords match, update admin information
      const updatedAdminProfile = {
        ...adminProfile,
        username: newUsername,
        email: newEmail,
        phone: newPhone,
        password: newPassword || adminProfile.password, // Keep the old password if a new one is not provided
      };
      console.log('Admin information updated:', updatedAdminProfile);
      // Reset fields after successful update
      setAdminProfile(updatedAdminProfile);
      setEditMode(false);
      setNewUsername('');
      setNewEmail('');
      setNewPhone('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordsMatch(true);
    } else {
      // Passwords don't match, display warning
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
      <div className="container mx-auto mt-8 p-8 bg-screenYellow rounded">
        <h2 className="text-2xl text-darkBlue font-bold mb-4">Admin Profile</h2>
        <div className="flex items-center">
          <IoPersonCircle color={'#448DB8'} size={100} />
          <div>
            <p className="text-black-700 text-sm font-bold mb-2">Username: {adminProfile.username}</p>
            <p className="text-black-700 text-sm font-bold mb-2">Email: {adminProfile.email}</p>
            <p className="text-black-700 text-sm font-bold mb-2">Phone: {adminProfile.phone}</p>
            <p className="text-black-700 text-sm font-bold mb-2">
              Password: {editMode ? '********' : '*'.repeat(adminProfile.password.length)}
            </p>
          </div>
        </div>

        {editMode && (
          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Username:</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Email:</label>
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Phone:</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded ${passwordsMatch ? '' : 'border-red-500'}`}
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match. Please try again.</p>
              )}
            </div>
            <div className="flex">
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!editMode && (
          <button
            onClick={handleEditClick}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
