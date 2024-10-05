document.addEventListener('DOMContentLoaded', function() {
    const showGroupsBtn = document.getElementById('showGroupsBtn');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const groupsSection = document.getElementById('groupsSection');
    const addGroupModal = document.getElementById('addGroupModal');
    const closeModal = document.getElementById('closeModal');
    const addGroupForm = document.getElementById('addGroupForm');

    let groups = [];

    showGroupsBtn.addEventListener('click', toggleGroupsSection);
    addGroupBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunction);
    addGroupForm.addEventListener('submit', addNewGroup);

    function toggleGroupsSection() {
        groupsSection.classList.toggle('hidden');
        if (!groupsSection.classList.contains('hidden')) {
            renderGroups();
        }
    }

    function openModal() {
        addGroupModal.classList.remove('hidden');
    }

    function closeModalFunction() {
        addGroupModal.classList.add('hidden');
    }

    function addNewGroup(e) {
        e.preventDefault();
        const groupName = document.getElementById('groupName').value;
        const csvFile = document.getElementById('csvFile').files[0];

        if (csvFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const csv = e.target.result;
                const users = parseCSV(csv);
                groups.push({ name: groupName, users: users });
                renderGroups();
                closeModalFunction();
                addGroupForm.reset();
            };
            reader.readAsText(csvFile);
        } else {
            groups.push({ name: groupName, users: [] });
            renderGroups();
            closeModalFunction();
            addGroupForm.reset();
        }
    }

    function parseCSV(csv) {
        const lines = csv.split('\n');
        return lines.map(line => {
            const [name, email] = line.split(',');
            return { name: name.trim(), email: email.trim() };
        }).filter(user => user.name && user.email);
    }

    function renderGroups() {
        groupsSection.innerHTML = '';
        groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.className = 'group';
            groupElement.innerHTML = `
                <h2>${group.name}</h2>
                ${group.users.map(user => `
                    <div class="user">
                        <strong>${user.name}</strong> - ${user.email}
                    </div>
                `).join('')}
            `;
            groupsSection.appendChild(groupElement);
        });
    }
});