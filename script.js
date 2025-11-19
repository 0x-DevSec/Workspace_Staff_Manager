//  ===================== === === Variables =================================
let workers = [];
let selectedWorkerIndex = null;

const newWorkerbtn = document.querySelector('.add-btn');
const modaloverlay = document.querySelector('.modal-overlay');
const editodaloverlay = document.querySelector('.edit-modal-overlay');
const detailoverlay = document.querySelector('.detail-overlay');
const closebtn = document.querySelector('.modal-cancel');
const experiencebtn = document.querySelector('.experience');
const divexperience = document.querySelector('.divexperience');
const form = document.querySelector(".modal-form");
const sidebar = document.querySelector('.sidebar');

// regix

// Name: letters, spaces, hyphens, 2–50 chars
const NAME_REGEX = /^[A-Za-z\s\-]{2,50}$/;
// Email: standard email structure
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: digits only, 7–15 numbers (you can adjust)
const PHONE_REGEX = /^\d{7,15}$/;
// Photo URL: must start with http/https and end with an image extension
const PHOTO_URL_REGEX = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;


// show add worker form 
newWorkerbtn.addEventListener('click', () => {
    modaloverlay.classList.remove('hidden');
})

// show add experience inputs

experiencebtn.addEventListener('click', () => {
    divexperience.classList.remove('hidden');
})


// close  add worker form
closebtn.addEventListener('click', () => {
    modaloverlay.classList.add('hidden');
})


// form data with input validation
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get input values
    const name = document.querySelector('input[placeholder="Enter name"]');
    const role = document.getElementById('add-role');
    const Photo = document.querySelector('input[placeholder="Image link"]');
    const phone = document.querySelector('input[placeholder="Phone number"]');
    const jobtitle = document.getElementById('jobTitle');
    const companyName = document.getElementById('companyName');
    const location = document.getElementById('location');


    const data = {
        name: name.value,
        role: role.value,
        photo: Photo.value,
        phone: phone.value,
        jobtitle: jobtitle.value,
        companyName: companyName.value,
        location: location.value,
    };

    workers.push(data);
    displayWorkers();
    form.reset();
    modaloverlay.classList.add('hidden');
});

// ================= DISPLAY WORKERS ====================

const displayWorkers = () => {

    workers.forEach((worker, index) => {

        const card = document.createElement("div");
        card.classList.add("worker-card");
        card.dataset.index = index;

        card.innerHTML = `
            <img src="${worker.photo}">
            <div>
                <h4>${worker.name}</h4>
                <p>${worker.role}</p>
            </div>
            <button class="edit-btn">Edit</button>
        `;
        sidebar.appendChild(card);
    });
};
