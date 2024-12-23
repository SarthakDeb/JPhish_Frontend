import React, { useState } from "react";
import axios from 'axios';

const UserGroups = () => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setGroupName("");
    setCsvFile(null);
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleAddGroup = async () => {
    if (!groupName || !csvFile) {
      alert("Please provide a group name and a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("file", csvFile);

    try {
      await axios.post("http://localhost:9000/usergroup/create", formData); // Replace with your backend API URL
      alert("Group added successfully!");
      closeModal();
      fetchGroups();
    } catch (error) {
      console.error("Error adding group:", error);
      alert("Failed to add group.");
    }
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9000/usergroup/all"); // Replace with your backend API URL
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      alert("Failed to fetch groups.");
    }
    setLoading(false);
  };

  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/usergroup/${id}`); // Replace with your backend API URL
      alert("Group deleted successfully!");
      fetchGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Failed to delete group.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-500 min-h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">User Groups</h2>

      <div className="mb-6 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={openModal}
        >
          Add Group
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={fetchGroups}
        >
          Show Groups
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading groups...</p>
      ) : (
        <div>
          {groups.length > 0 ? (
            <ul className="space-y-4">
              {groups.map((group) => (
                <li
                  key={group.id}
                  className="flex items-center justify-between bg-gray-700 shadow-md rounded-lg p-4 "
                >
                  <div className="text-gray-300">
                    <strong>Name:</strong> {group.groupName}
                  </div>
                  <div className="mb-2">
                    <strong className="text-gray-400">Created At:</strong>{" "}
                    {new Date(group.createdAt).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong className="text-gray-300">Users:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {group.users.map((user, index) => (
                        <li key={index} className="text-gray-300">
                          <span className="font-medium">{user.name}</span> (
                          {user.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                      onClick={() => alert(`Group ${group.groupName} selected!`)}
                    >
                      Select
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No groups to display. Click "Show Groups" to fetch data.</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-transparent w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-lg font-bold mb-4">Add Group</h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Group Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Upload CSV File</label>
              <input
                type="file"
                accept=".csv"
                className="w-full px-3 py-2 border rounded-lg text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                onChange={handleFileChange}
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
                onClick={handleAddGroup}
              >
                Add Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGroups;
