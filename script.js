// DATA
let workers = [];
let workersInRooms = [];
let selectedWorker = null;
let editIndex = null;

// ELEMENTS
const addBtn = document.querySelector(".add-btn");
const sidebar = document.querySelector(".sidebar");
const modal = document.querySelector(".modal-overlay");
const form = document.querySelector(".modal-form");
const editModal = document.querySelector(".edit-modal-overlay");
const editForm = document.querySelector(".edit-modal-form");
const detailModal = document.querySelector(".detail-overlay");

// HIDE MODALS
modal.classList.add("hidden");
detailModal.classList.add("hidden");
editModal.style.display = "none";

// VALIDATION
function validate(name, email, phone, photo) {
    if (name.length < 2) return alert("Name too short!");
    if (!email.includes('@')) return alert("Invalid email!");
    if (!/^\d{7,15}$/.test(phone)) return alert("Invalid phone!");
    if (!photo.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return alert("Invalid photo URL!");
    return true;
}

// SHOW WORKERS
function showWorkers() {
    sidebar.querySelectorAll(".staff-card").forEach(card => card.remove());
    
    workers.forEach((worker, index) => {
        if (workersInRooms.includes(worker.id)) return;
        
        const card = document.createElement("div");
        card.classList.add("staff-card");
        card.dataset.id = worker.id;
        card.innerHTML = `
            <img src="${worker.photo}" alt="${worker.name}">
            <div><h4>${worker.name}</h4><p>${worker.role}</p></div>
            <button class="edit-btn">Edit</button>
        `;
        
        card.onclick = (event) => {
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
                sidebar.querySelectorAll(".staff-card").forEach(card => card.classList.remove("selected"));
                card.classList.add("selected");
            }
        };
        
        sidebar.insertBefore(card, addBtn);
    });
}

// OPEN ADD MODAL
addBtn.onclick = () => modal.classList.remove("hidden");

// CLOSE ADD MODAL
document.querySelector(".modal-cancel").onclick = () => {
    modal.classList.add("hidden");
    form.reset();
};

// TOGGLE EXPERIENCE
document.querySelector(".experience").onclick = () => {
    document.querySelector(".divexperience").classList.toggle("hidden");
};

// ADD WORKER
form.onsubmit = (event) => {
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
    modal.classList.add("hidden");
    form.reset();
};

// CLOSE EDIT MODAL
document.querySelector(".edit-modal-cancel").onclick = () => editModal.style.display = "none";

// SAVE EDIT
editForm.onsubmit = (event) => {
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
    editModal.style.display = "none";
};

// SHOW DETAILS
function showDetail(workerId) {
    const worker = workers.find(worker => String(worker.id) === String(workerId));
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

// CLOSE DETAILS
document.querySelector(".detail-close").onclick = () => detailModal.classList.add("hidden");