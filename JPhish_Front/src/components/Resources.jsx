import React, { useState } from "react";
import axios from "axios";

const Resources = ({ onSelectResource }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [name, setName] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [landingPage, setLandingPage] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setName("");
    setEmailTemplate("");
    setLandingPage("");
  };

  const openPreview = (content) => {
    setSelectedContent(content);
    setShowPreview(true);
  };

  const closePreview = () => {
    setSelectedContent("");
    setShowPreview(false);
  };

  const handleAddResource = async () => {
    if (!name || !emailTemplate || !landingPage) {
      alert("Please fill out all fields.");
      return;
    }

    const resourceData = { name, emailTemplate, landingPage };

    try {
      await axios.post("http://localhost:9000/resources/create", resourceData); 
      alert("Resource added successfully!");
      closeModal();
      fetchResources();
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Failed to add resource.");
    }
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:9000/resources/all"); // Replace with your backend API URL
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
      alert("Failed to fetch resources.");
    }
    setLoading(false);
  };

  const handleDeleteResource = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/resources/${id}`); // Replace with your backend API URL
      alert("Resource deleted successfully!");
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Failed to delete resource.");
    }
  };
  const handleSelectResource = (res) => {
    if (onSelectResource) onSelectResource(res);
    alert(`Resource selected: ${res.name}`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-500 min-h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Resources</h2>

      <div className="mb-6 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={openModal}
        >
          Add Resource
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={fetchResources}
        >
          Show Resources
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading resources...</p>
      ) : (
        <div>
          {resources.length > 0 ? (
            <ul className="space-y-4">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="bg-gray-700 shadow-md rounded-lg p-4 border"
                >
                  <div className="mb-2 text-gray-300">
                    <strong className="text-gray-300">Name:</strong> {resource.name}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                      onClick={() => openPreview(resource.emailTemplate)}
                    >
                      View Email Template
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                      onClick={() => openPreview(resource.landingPageTemplate)}
                    >
                      View Landing Page
                    </button>
                    <button
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-red-600"
                      onClick={() => handleSelectResource(resource)}
                    >
                      Select
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteResource(resource.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No resources to display. Click "Show Resources" to fetch data.
            </p>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-md shadow-md w-[600px]">
            <h3 className="text-lg text-gray-300 font-bold mb-4">Add Resource</h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Email Template</label>
              <textarea
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
                rows={6}
                placeholder="Paste your HTML content here..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Landing Page HTML</label>
              <textarea
                className="bg-transparent w-full px-3 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                value={landingPage}
                onChange={(e) => setLandingPage(e.target.value)}
                rows={6}
                placeholder="Paste your HTML, CSS, and JS content here..."
              ></textarea>
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
                onClick={handleAddResource}
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Preview</h3>
            <div
              className="border p-4 overflow-auto h-96"
              dangerouslySetInnerHTML={{ __html: selectedContent }}
            ></div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={closePreview}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
