// =====================================
// DATA
// =====================================

let workers = [];
let workersInRooms = [];
let selectedWorker = null;
let editIndex = null;

// =====================================
// ELEMENTS
// =====================================

const addBtn = document.querySelector('.add-btn');
const sidebar = document.querySelector('.sidebar');
const modal = document.querySelector('.modal-overlay');
const form = document.querySelector('.modal-form');
const editModal = document.querySelector('.edit-modal-overlay');
const editForm = document.querySelector('.edit-modal-form');
const detailModal = document.querySelector('.detail-overlay');

// =====================================
// VALIDATION
// =====================================

function validate(name, email, phone, photo) {
    if (name.length < 2) return alert("Name too short!");
    if (!email.includes("@")) return alert("Invalid email!");
    if (!/^\d{7,15}$/.test(phone)) return alert("Invalid phone!");
    if (!photo.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return alert("Invalid photo URL!");
    return true;
}

// =====================================
// DISPLAY WORKERS IN SIDEBAR
// =====================================

function showWorkers() {
    sidebar.querySelectorAll(".staff-card").forEach(c => c.remove());

    workers.forEach((worker, index) => {
        if (workersInRooms.includes(worker.id)) return;

        const card = document.createElement("div");
        card.classList.add("staff-card");
        card.dataset.id = worker.id;

        card.innerHTML =
            "<img src='" + worker.photo + "'>" +
            "<div><h4>" + worker.name + "</h4><p>" + worker.role + "</p></div>" +
            "<button class='edit-btn'>Edit</button>";

        card.onclick = function (event) {
            if (event.target.classList.contains("edit-btn")) {
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
                selectedWorker = worker;
                sidebar.querySelectorAll(".staff-card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
            }
        };

        sidebar.insertBefore(card, addBtn);
    });
}

// =====================================
// ADD WORKER
// =====================================

addBtn.onclick = function () {
    modal.classList.remove("hidden");
};

document.querySelector(".modal-cancel").onclick = function () {
    modal.classList.add("hidden");
    form.reset();
};

document.querySelector(".experience").onclick = function () {
    document.querySelector(".divexperience").classList.toggle("hidden");
};

form.onsubmit = function (event) {
    event.preventDefault();

    const name = form.querySelector("input[placeholder='Enter name']").value.trim();
    const role = document.getElementById("add-role").value;
    const photo = form.querySelector("input[placeholder='Image link']").value.trim();
    const email = form.querySelector("input[placeholder='Email']").value.trim();
    const phone = form.querySelector("input[placeholder='Phone number']").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const location = document.getElementById("location").value.trim();

    if (!validate(name, email, phone, photo)) return;

    workers.push({
        id: Date.now(),
        name: name,
        role: role,
        photo: photo,
        email: email,
        phone: phone,
        jobTitle: jobTitle,
        companyName: document.getElementById("companyName").value.trim(),
        location: location
    });

    showWorkers();
    highlightEmptyRooms();
    modal.classList.add("hidden");
    form.reset();
};

// =====================================
// EDIT WORKER
// =====================================

document.querySelector(".edit-modal-cancel").onclick = function () {
    editModal.style.display = "none";
};

editForm.onsubmit = function (event) {
    event.preventDefault();

    const worker = workers[editIndex];
    worker.name = document.getElementById("edit-name").value.trim();
    worker.role = document.getElementById("edit-role").value;
    worker.photo = document.getElementById("edit-photo").value.trim();
    worker.email = document.getElementById("edit-email").value.trim();
    worker.phone = document.getElementById("edit-phone").value.trim();
    worker.jobTitle = document.getElementById("edit-experience").value.trim();
    worker.location = document.getElementById("edit-hours").value.trim();

    showWorkers();
    highlightEmptyRooms();
    editModal.style.display = "none";
};

// =====================================
// DETAILS MODAL
// =====================================

function showDetail(workerId) {
    const worker = workers.find(w => String(w.id) === String(workerId));
    if (!worker) return;

    document.querySelector(".detail-photo").src = worker.photo;
    document.querySelector(".detail-name").textContent = worker.name;
    document.querySelector(".detail-role").textContent = worker.role;
    document.getElementById("detail-email").textContent = worker.email;
    document.getElementById("detail-phone").textContent = worker.phone;
    document.getElementById("detail-exp").textContent = worker.jobTitle;
    document.getElementById("detail-hours").textContent = worker.location;

    detailModal.classList.remove("hidden");
}

document.querySelector(".detail-close").onclick = function () {
    detailModal.classList.add("hidden");
};

// =====================================
// ROLES & ROOM RULES
// =====================================

const roomRoles = {
    conference: "Manager",
    reception: "Receptionist",
    security: "Security",
    servers: "Developer",
    staff: "Staff",
    archive: "archiver",
};


function canAssignToRoom(worker, roomName) {
    const requiredRole = roomRoles[roomName];
    const role = worker.role.toLowerCase();

    // Manager has access to all rooms
    if (role === "manager") return true;

    // Nettoyage can ONLY be assigned to archive room
    if (role === "nettoyage") {
        return roomName === "archive";
    }

    if (!requiredRole) return true;
    return role === requiredRole.toLowerCase();
}
// =====================================
// CREATE ROOM CARD
// =====================================

function createRoomCard(worker) {
    const card = document.createElement("div");
    card.classList.add("worker-card");
    card.dataset.id = worker.id;

    card.innerHTML =
        "<button class='remove-worker'>X</button>" +
        "<img src='" + worker.photo + "'>" +
        "<h4>" + worker.name + "</h4>";

    const workerId = worker.id;

    card.querySelector(".remove-worker").onclick = function (event) {
        event.stopPropagation();
        card.remove();
        workersInRooms = workersInRooms.filter(id => id !== workerId);
        showWorkers();
        highlightEmptyRooms();
    };

    card.onclick = function () {
        showDetail(card.dataset.id);
    };

    return card;
}

// =====================================
// HIGHLIGHT EMPTY ROOMS
// =====================================

function highlightEmptyRooms() {
    document.querySelectorAll(".room").forEach(function (room) {
        const hasWorker = room.querySelector(".worker-card");
        room.style.border = hasWorker ? "none" : "3px solid red";
    });
}

// =====================================
// ASSIGN WORKER TO ROOM
// =====================================

document.querySelectorAll(".btn").forEach(function (button) {
    button.onclick = function () {
        if (!selectedWorker) return alert("Select a worker first!");

        const room = button.closest("div");
        const roomName = Array.from(room.classList).find(function (c) {
            return ["conference", "reception", "security", "servers", "staff", "archive"].includes(c);
        });

        if (!canAssignToRoom(selectedWorker, roomName)) {
            return alert(selectedWorker.name + " cannot be assigned to " + roomName);
        }

        const roomCard = createRoomCard(selectedWorker);
        room.appendChild(roomCard);

        workersInRooms.push(selectedWorker.id);

        const sidebarCard = document.querySelector(".staff-card[data-id='" + selectedWorker.id + "']");
        if (sidebarCard) sidebarCard.remove();

        selectedWorker = null;
        highlightEmptyRooms();
    };
});
