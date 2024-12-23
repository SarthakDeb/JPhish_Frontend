import React from 'react'

import { useState } from "react";
import axios from "axios";

const SendingProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmailId, setProfileEmailId] = useState("");
  const [profileSMTP, setProfileSMTP] = useState("");
  const [profileDesc, setProfileDesc] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setProfileName("");
    setProfileEmailId("");
    setProfileSMTP("");
    setProfileDesc("");
  };

  const handleAddProfile = async () => {
    if (!profileName || !profileEmailId || !profileSMTP || !profileDesc) {
      alert("Please fill out all fields.");
      return;
    }

    const profileData = {
      profileName,
      profileEmailId,
      profileSMTP,
      profileDesc,
    };

    try {
      await axios.post("http://localhost:9000/profile/create", profileData); // Replace with your backend API URL
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
      const response = await axios.get("http://localhost:9000/profile/get"); // Replace with your backend API URL
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      alert("Failed to fetch profiles.");
    }
    setLoading(false);
  };

  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/profile/${id}`); // Replace with your backend API URL
      alert("Profile deleted successfully!");
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile.");
    }
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
                      onClick={() => alert(`Profile ${profile.profileName} selected!`)}
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
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add Profile</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Profile Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Profile Email ID</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileEmailId}
                onChange={(e) => setProfileEmailId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">SMTP</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                value={profileSMTP}
                onChange={(e) => setProfileSMTP(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
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
