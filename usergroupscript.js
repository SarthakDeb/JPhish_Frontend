
document.addEventListener('DOMContentLoaded', () => {
    const showGroupsBtn = document.getElementById('showGroupsBtn');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const addGroupModal = document.getElementById('addGroupModal');
    const groupsSection = document.getElementById('groupsSection');
    const createGroupForm = document.getElementById('createGroupForm');

    // Function to parse CSV
    function parseCSV(csv) {
        const lines = csv.split('\n');
        return lines.map(line => {
            const [name, email] = line.split(',');
            return { name: name.trim(), email: email.trim() };
        }).filter(user => user.name && user.email);
    }

    function renderGroups(groups) {
        groupsSection.innerHTML = ''; // Clear the previous content
        groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.className = 'group';
            groupElement.innerHTML = `
                <h2>ID: ${group.id}, Name: ${group.groupName.replace(/"/g, '')}</h2>
                <h3>Users:</h3>
                <div>${group.users && group.users.length > 0 ? group.users.map(user => `
                    <div class="user">
                        <p>User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}</p>
                    </div>
                `).join('') : '<p>No users in this group</p>'}</div>
                <p>Created At: ${group.createdAt ? new Date(group.createdAt).toLocaleString() : 'N/A'}<p>
            `;
            groupsSection.appendChild(groupElement);
        });
    }

    // Function to fetch and display all groups
    async function fetchAndDisplayGroups() {
        try {
            const response = await fetch('http://localhost:9000/usergroup/all');
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const groups = await response.json();
            console.log(groups);
            renderGroups(groups);
            groupsSection.classList.remove('hidden'); // Show the groups section
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event listener for creating a new group
    createGroupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const groupName = document.getElementById('groupName').value;
        const csvFile = document.getElementById('csvFile').files[0];

        if (!csvFile) {
            alert('Please upload a CSV file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const usersCSV = e.target.result;
            const users = parseCSV(usersCSV);

            try {
                const response = await fetch('http://localhost:9000/usergroup/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: groupName, users })
                });

                if (!response.ok) {
                    throw new Error('Failed to create group');
                }

                const createdGroup = await response.json();
                alert('Group created successfully!');
                fetchAndDisplayGroups(); // Refresh the group list
                addGroupModal.classList.add('hidden'); // Hide the modal
            } catch (error) {
                console.error('Error:', error);
            }
        };
        reader.readAsText(csvFile);
    });

    // Event listeners for showing and hiding the modal
    addGroupBtn.addEventListener('click', () => {
        addGroupModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        addGroupModal.classList.add('hidden');
    });

    // Event listener for showing groups
    showGroupsBtn.addEventListener('click', () => {
        groupsSection.classList.toggle('hidden');
        fetchAndDisplayGroups();
    });

    // Initial fetch and display of groups
    // fetchAndDisplayGroups();
});