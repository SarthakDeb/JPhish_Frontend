import React from 'react'

import { useState } from "react";
import axios from "axios";

const SendingProfile = ({ onSelectProfile }) => {
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmailId, setProfileEmailId] = useState("");
  const [profileSMTPHost, setProfileSMTPHost] = useState("");
  const [profileSMTPPort, setProfileSMTPPort] = useState("");
  const [profileSMTPUsername, setProfileSMTPUsername] = useState("");
  const [profileSMTPPassword, setProfileSMTPPassword] = useState("");
  const [profileDesc, setProfileDesc] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setProfileName("");
    setProfileEmailId("");
    setProfileSMTPHost("");
    setProfileSMTPPort("");
    setProfileSMTPUsername("");
    setProfileSMTPPassword("");
    setProfileDesc("");
  };

  const handleAddProfile = async () => {
    if (!profileName || !profileEmailId || !profileSMTPHost ||!profileSMTPPort ||!profileSMTPUsername ||!profileSMTPPassword || !profileDesc) {
      alert("Please fill out all fields.");
      return;
    }

    const profileData = {
      profileName,
      profileEmailId,
      profileSMTPHost,
      profileSMTPPort,
      profileSMTPUsername,
      profileSMTPPassword,
      profileDesc,
    };

    try {
      await axios.post("http://localhost:9000/profile/create", profileData); 
      alert("Profile added successfully!");
      closeModal();
      fetchProfiles();
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Failed to add profile.");
    }
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9000/profile/get"); 
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      alert("Failed to fetch profiles.");
    }
    setLoading(false);
  };

  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/profile/${id}`); 
      alert("Profile deleted successfully!");
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile.");
    }
  };
  const handleSelectProfile = (profile) => {
    if (onSelectProfile) onSelectProfile(profile);
    alert(`Profile ${profile.profileName} selected!`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-500 min-h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Sending Profiles</h2>

      <div className="mb-6 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={openModal}
        >
          Add Profile
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={fetchProfiles}
        >
          Show Profiles
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading profiles...</p>
      ) : (
        <div>
          {profiles.length > 0 ? (
            <ul className="space-y-4">
              {profiles.map((profile) => (
                <li
                  key={profile.id}
                  className="bg-gray-700 shadow-md rounded-lg p-4 border"
                >
                  <div className="mb-2 text-gray-200">
                    <strong className="text-gray-400">Name:</strong>{" "}
                    {profile.profileName}
                  </div>
                  <div className="mb-2 text-gray-200">
                    <strong className="text-gray-400">Email:</strong>{" "}
                    {profile.profileEmailId}
                  </div>
                  <div className="mb-2 text-gray-200">
                    <strong className="text-gray-400">SMTP:</strong>{" "}
                    {profile.profileSMTP}
                  </div>
                  <div className="mb-2 text-gray-200">
                    <strong className="text-gray-400">Description:</strong>{" "}
                    {profile.profileDesc}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                      onClick={() => handleSelectProfile(profile)}
                    >
                      Select
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteProfile(profile.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No profiles to display. Click "Show Profiles" to fetch data.
            </p>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-md shadow-md w-[600px]">
            <h3 className="text-gray-300 text-lg font-bold mb-4">Add Profile</h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Profile Name</label>
              <input
                type="text"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Profile Email ID</label>
              <input
                type="email"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileEmailId}
                onChange={(e) => setProfileEmailId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">SMTP Host</label>
              <input
                type="text"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileSMTPHost}
                onChange={(e) => setProfileSMTPHost(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">SMTP Port</label>
              <input
                type="text"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileSMTPPort}
                onChange={(e) => setProfileSMTPPort(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">SMTP Username</label>
              <input
                type="text"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileSMTPUsername}
                onChange={(e) => setProfileSMTPUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">SMTP Password</label>
              <input
                type="text"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileSMTPPassword}
                onChange={(e) => setProfileSMTPPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileDesc}
                onChange={(e) => setProfileDesc(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddProfile}
              >
                Add Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendingProfile;
