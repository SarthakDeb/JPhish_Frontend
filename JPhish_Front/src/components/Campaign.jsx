import React, {useContext, useState} from 'react'
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

 const Campaign = ({ selectedGroup, selectedProfile, selectedResource}) => {
    const [showModal, setShowModal] = useState(false);
    const [showSelectedModal, setShowSelectedModal] = useState(false);
    const [formData, setFormData] = useState({
        recipientEmails: '',
        senderEmail: '',
        smtpHost: '',
        smtpPort: '',
        smtpUserName: '',
        smtpPassword: '',
        landingPage: '',
        description: ''
      });
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext);

    const handleUseSelected = () => {
      if (selectedGroup || selectedProfile || selectedResource) {
        setShowSelectedModal(true);
      } else {
        alert('Please select at least one item.');
      }
    };
    const handleSendEmailWithSelected = async () => {
      if (!selectedGroup || !selectedProfile || !selectedResource ) {
        alert('Please select a group, profile, and resource before sending emails.');
        return;
      }
  
      // Extract necessary data
      const profileId = selectedProfile.id; 
      const userGroupId = selectedGroup.id; 
      const resourceId = selectedResource.id;
      const jwtToken = token;
  
      // Prepare payload
      const payload = {
        jwtToken,
        profileId,
        userGroupId,
        resourceId
      };
  
      try {
        await axios.post('http://localhost:8080/api/campaigns/send', payload);
        alert('Emails sent successfully!');
        setShowSelectedModal(false);
      } catch (error) {
        console.error('Error sending emails:', error);
        alert('Failed to send emails.');
      }
    };

    const openModal = ()=>{setShowModal(true)};
    const closeModal = ()=>{setShowModal(false)};
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const sendEmail = () => {
      const { recipientEmails, senderEmail, smtpHost, smtpPort, smtpUserName, smtpPassword, landingPage, description } = formData;
      const recipientsArray = recipientEmails
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item);

        axios.post('http://localhost:8080/api/campaigns/send/single', {
          recipientEmails: recipientsArray, 
          senderEmail,
          smtpHost, 
          smtpPort, 
          smtpUserName, 
          smtpPassword,
          landingPage,
          description
        })
          .then(() => {
            alert('Email sent!');
            closeModal();
          })
          .catch(err => console.error(err));
      };

      const showCampaigns = () => {
        axios.get('http://localhost:8082/api/users/getusers')
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => console.error(err));
      };


  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-500 min-h-screen w-screen">
        <h2 className="text-3xl font-bold mb-4 text-gray-300">&#9614;Campaigns</h2>
        <div className="mb-6  p-2 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleUseSelected}>
          Use selected
        </button>
        <button
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          onClick={showCampaigns}>
          Show Campaigns
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={openModal}>
          Create new
        </button>
      </div> 
      {users.length > 0 && (
        <div className="bg-gray-700 p-4 rounded-md mb-6">
          <h3 className="text-xl text-gray-300 font-bold mb-2">User Data</h3>
          <table className="w-full text-gray-200">
            <thead>
              <tr className="border-b border-gray-500">
                <th className="p-2">Email</th>
                <th className="p-2">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-600">
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} 
      {showModal && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 p-4 rounded-md shadow-md w-[600px] h-[80vh] overflow-y-auto overflow-x-hidden scrollbar-hidden">
            <h3 className="text-xl text-gray-300 font-bold mb-4">Create New Campaign</h3>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Email Recipient</label>
              <input
                name="recipientEmails"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.recipientEmails}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Email Sender</label>
              <input
                name="senderEmail"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.senderEmail}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Sender SMTP Host</label>
              <input
                name="senderEmail"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.smtpHost}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Sender SMTP Port</label>
              <input
                name="senderEmail"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.smtpPort}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Sender SMTP Username</label>
              <input
                name="senderEmail"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.smtpUserName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Sender SMTP Password</label>
              <input
                name="senderEmail"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.smtpPassword}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-gray-300">Landing Page</label>
              <input
                name="landingPage"
                type="text"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.landingPage}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Email body</label>
              <textarea
                name="description"
                className="bg-transparent text-gray-200 border border-gray-300 p-2 w-full"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={sendEmail}
              >
                Send Email
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-black rounded-md hover:bg-gray-500"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showSelectedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-700 p-6 rounded-md shadow-md w-[600px] text-gray-300">
            <h3 className="text-xl font-bold mb-4">Selected Items</h3>
            {selectedGroup && (
              <div className="mb-2">
                <strong>Group:</strong> {selectedGroup.groupName}
              </div>
            )}
            {selectedProfile && (
              <div className="mb-2">
                <strong>Profile:</strong> {selectedProfile.profileName}
              </div>
            )}
            {selectedResource && (
              <div className="mb-2">
                <strong>Resource:</strong> {selectedResource.name}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSendEmailWithSelected}
              >
                Send Email
              </button>
              <button
                className="px-4 py-2 bg-gray-400 rounded-md text-black hover:bg-gray-500"
                onClick={() => setShowSelectedModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Campaign;
