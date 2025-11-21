// ========================================
// DATA STORAGE
// ========================================

let workers = []; // Stores all worker objects
let workersInRooms = []; // Tracks IDs of workers currently assigned to rooms
let selectedWorker = null; // Currently selected worker for assignment
let editIndex = null; // Index of worker being edited

// ========================================
// DOM ELEMENTS
// ========================================
const addBtn = document.querySelector(".add-btn"); // Button to add new worker
const sidebar = document.querySelector(".sidebar"); // Sidebar containing worker list
const modal = document.querySelector(".modal-overlay"); // Modal for adding workers
const form = document.querySelector(".modal-form"); // Form inside add modal
const editModal = document.querySelector(".edit-modal-overlay"); // Modal for editing workers
const editForm = document.querySelector(".edit-modal-form"); // Form inside edit modal
const detailModal = document.querySelector(".detail-overlay"); // Modal for viewing worker details

// ========================================
// VALIDATION FUNCTION
// ========================================
// Validates worker input fields before adding/editing
function validate(name, email, phone, photo,jobTitle,location,company) {
    if (name.length < 2) return alert("Name too short!");
    if (!email.includes('@')) return alert("Invalid email!");
    if (!/^\d{7,15}$/.test(phone)) return alert("Invalid phone!");
    if (!photo.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return alert("Invalid photo URL!");
    // if (jobTitle == '') return alert("jobtitle is empty");
    // if(location == '') return alert("location is empty");
    // if(company=='') return alert(" companyName is empty");
    return true;
}

// ========================================
// DISPLAY WORKERS IN SIDEBAR
// ========================================
// Renders all workers who are not currently assigned to rooms
function showWorkers() {
    // Remove existing worker cards
    sidebar.querySelectorAll(".staff-card").forEach(card => card.remove());
    
    // Create card for each unassigned worker
    workers.forEach((worker, index) => {
        if (workersInRooms.includes(worker.id)) return; // Skip workers already in rooms
        
        const card = document.createElement("div");
        card.classList.add("staff-card");
        card.dataset.id = worker.id;
        card.innerHTML = `
            <img src="${worker.photo}" alt="${worker.name}">
            <div><h4>${worker.name}</h4><p>${worker.role}</p></div>
            <button class="edit-btn">Edit</button>
        `;
        
        // Handle card clicks (edit button or select worker)
        card.onclick = (event) => {
            if (event.target.classList.contains("edit-btn")) {
                // Open edit modal with worker's current data
                editIndex = index;
                document.getElementById("edit-name").value = worker.name;
                document.getElementById("edit-role").value = worker.role;
                document.getElementById("edit-photo").value = worker.photo;
                document.getElementById("edit-email").value = worker.email;
                document.getElementById("edit-phone").value = worker.phone;
                document.getElementById("edit-experience").value = worker.jobTitle;
                document.getElementById("edit-hours").value = worker.location;
                editModal.style.display = "flex";
            } else {
                // Select worker for room assignment
                selectedWorker = worker;
                sidebar.querySelectorAll(".staff-card").forEach(card => card.classList.remove("selected"));
                card.classList.add("selected");
            }
        };
        
        sidebar.insertBefore(card, addBtn);
    });
}

// ========================================
// ADD WORKER MODAL
// ========================================
// Open add worker modal
addBtn.onclick = () => modal.classList.remove("hidden");

// Close add worker modal
document.querySelector(".modal-cancel").onclick = () => {
    modal.classList.add("hidden");
    form.reset();
};

// Toggle experience section visibility
document.querySelector(".experience").onclick = () => {
    document.querySelector(".divexperience").classList.toggle("hidden");
};

// Handle add worker form submission
form.onsubmit = (event) => {
    event.preventDefault();
    
    // Get form values
    const name = form.querySelector("input[placeholder='Enter name']").value.trim();
    const role = document.getElementById("add-role").value;
    const photo = form.querySelector("input[placeholder='Image link']").value.trim();
    const email = form.querySelector("input[placeholder='Email']").value.trim();
    const phone = form.querySelector("input[placeholder='Phone number']").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const location = document.getElementById("location").value.trim();
    const company =  document.getElementById("companyName").value.trim();
    
    // Validate inputs
    if (!validate(name, email, phone, photo)) return;
    
    // Add new worker to array
    workers.push({
        id: Date.now(), // Unique ID based on timestamp
        name: name,
        role: role,
        photo: photo,
        email: email,
        phone: phone,
        jobTitle: jobTitle,
        companyName: company,
        location: location
    });
    
    // Update UI and close modal
    showWorkers();
    modal.classList.add("hidden");
    form.reset();
};

// ========================================
// EDIT WORKER MODAL
// ========================================
// Close edit modal
document.querySelector(".edit-modal-cancel").onclick = () => editModal.style.display = "none";

// Handle edit worker form submission
editForm.onsubmit = (event) => {
    event.preventDefault();
    
    // Update worker data
    const worker = workers[editIndex];
    worker.name = document.getElementById("edit-name").value.trim();
    worker.role = document.getElementById("edit-role").value;
    worker.photo = document.getElementById("edit-photo").value.trim();
    worker.email = document.getElementById("edit-email").value.trim();
    worker.phone = document.getElementById("edit-phone").value.trim();
    worker.jobTitle = document.getElementById("edit-experience").value.trim();
    worker.location = document.getElementById("edit-hours").value.trim();
    
    // Update UI and close modal
    showWorkers();
    editModal.style.display = "none";
};

// ========================================
// WORKER DETAIL MODAL
// ========================================
// Display detailed information about a worker
function showDetail(workerId) {
    const worker = workers.find(worker => String(worker.id) === String(workerId));
    if (!worker) return;
    
    // Populate detail modal with worker info
    document.querySelector(".detail-photo").src = worker.photo;
    document.querySelector(".detail-name").textContent = worker.name;
    document.querySelector(".detail-role").textContent = worker.role;
    document.getElementById("detail-email").textContent = worker.email;
    document.getElementById("detail-phone").textContent = worker.phone;
    document.getElementById("detail-exp").textContent = worker.jobTitle;
    document.getElementById("detail-hours").textContent = worker.location;
    detailModal.classList.remove("hidden");
}

// Close detail modal
document.querySelector(".detail-close").onclick = () => detailModal.classList.add("hidden");

// ========================================
// ROOM ASSIGNMENT SYSTEM
// ========================================
// Maps room names to required worker roles
const roomRoles = {
    conference: "Manager",
    reception: "Receptionist",
    security: "Security",
    servers: "Developer",
    staff: "Staff",
    archive: "archiver"
};

// Check if worker's role matches room requirements
function canAssignToRoom(worker, roomName) {
    const requiredRole = roomRoles[roomName];
    if (!requiredRole) return true; // No role requirement
    return worker.role.toLowerCase() === requiredRole.toLowerCase();
}

// Create a worker card for display in a room
function createRoomCard(worker) {
    const card = document.createElement("div");
    card.classList.add("worker-card");
    card.dataset.id = worker.id;
    card.innerHTML = `
        <button class="remove-worker">X</button>
        <img src="${worker.photo}" alt="${worker.name}">
        <h4>${worker.name}</h4>
    `;
    
    const workerId = worker.id;
    
    // Remove worker from room
    card.querySelector(".remove-worker").onclick = (event) => {
        event.stopPropagation(); // fix double click error
        card.remove();
        workersInRooms = workersInRooms.filter(id => id !== workerId);
        showWorkers(); // Re-display in sidebar
    };
    
    // Click card to view worker details
    card.onclick = () => showDetail(card.dataset.id);
    
    return card;
}

// ========================================
// ASSIGN WORKERS TO ROOMS
// ========================================
// Handle room assignment button clicks
document.querySelectorAll(".btn").forEach(button => {
    button.onclick = () => {
        if (!selectedWorker) return alert("Select a worker first!");
        
        // Get room information
        const room = button.closest("div");
        const roomName = room.classList[0];
        
        // Check if worker can be assigned to this room
        if (!canAssignToRoom(selectedWorker, roomName)) {
            return alert(`${selectedWorker.name} cannot be assigned to ${roomName}`);
        }
        
        // Create card and add to room
        const roomCard = createRoomCard(selectedWorker);
        room.appendChild(roomCard);
        
        // Update tracking arrays and remove from sidebar
        workersInRooms.push(selectedWorker.id);
        document.querySelector(`.staff-card[data-id="${selectedWorker.id}"]`).remove();
        selectedWorker = null;
    };
});