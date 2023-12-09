import React, { useState, useEffect } from 'react';

const CustomerSettingsData = () => {
  // pachange lang ni bc im lost
  //STARTING HERE
  const [customerProfile, setCustomerProfile] = useState({
    id: 1, 
    username: 'Customer1',
    email: 'customer@gmail.com',
    phone: '321-654-6789',
    password: 'customer123', 
  });

  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Fetch customer profile data from the server (replace with actual API call)
    const fetchCustomerProfile = async () => {
      // Mock API call
      const response = await fetch('http://localhost:3001/user/employeeProfile',{  withCredentials: true,});
      const data = await response.json();
      setCustomerProfile(data);
    };

    fetchCustomerProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'newUsername':
        setNewUsername(value);
        break;
      case 'newEmail':
        setNewEmail(value);
        break;
      case 'newPhone':
        setNewPhone(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setNewUsername(customerProfile.username);
    setNewEmail(customerProfile.email);
    setNewPhone(customerProfile.phone);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setNewUsername('');
    setNewEmail('');
    setNewPhone('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveChanges = () => {
    if (newPassword === confirmPassword) {
      console.log('Customer information updated:', { newUsername, newEmail, newPhone, newPassword });
      setEditMode(false);
      setNewUsername('');
      setNewEmail('');
      setNewPhone('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  // TO HERE

  return (
    <div className="container mx-auto mt-8 p-8 bg-brightYellow rounded">
      <h2 className="text-2xl text-darkBlue font-bold mb-4">Customer Profile</h2>
      <div className="flex items-center">
        <div>
          <p className="text-black-700 text-sm font-bold mb-2">Username: {employeeProfile.username}</p>
          <p className="text-black-700 text-sm font-bold mb-2">Email: {employeeProfile.email}</p>
          <p className="text-black-700 text-sm font-bold mb-2">Phone: {employeeProfile.phone}</p>
          <p className="text-black-700 text-sm font-bold mb-2">
            Password: {editMode ? '********' : '*'.repeat(employeeProfile.password.length)}
          </p>
        </div>
      </div>

      {editMode && (
        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Username:</label>
            <input
              type="text"
              name="newUsername"
              value={newUsername}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Email:</label>
            <input
              type="text"
              name="newEmail"
              value={newEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Phone:</label>
            <input
              type="text"
              name="newPhone"
              value={newPhone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
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
  );
};

export default CustomerSettingsData;
