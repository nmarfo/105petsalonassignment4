// =============================
// 🐾 PET REGISTRATION LOGIC
// =============================
const petForm = document.getElementById("petForm");
const petsTableBody = document.querySelector("#petsTable tbody");

// Load pets & services from localStorage
let pets = JSON.parse(localStorage.getItem("pets")) || [];
let services = JSON.parse(localStorage.getItem("services")) || [];

function savePets() {
  localStorage.setItem("pets", JSON.stringify(pets));
}

function populateServiceDropdown() {
  const select = petForm.elements["service"];
  select.innerHTML = '<option value="">Select Service</option>';

  if (services.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "No services available (add some first)";
    opt.disabled = true;
    select.appendChild(opt);
    return;
  }

  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = `${service.name} - $${service.price}`;
    select.appendChild(option);
  });
}

function registerPet(event) {
  event.preventDefault();

  const pet = {
    id: Date.now(),
    name: petForm.elements["name"].value.trim(),
    age: petForm.elements["age"].value.trim(),
    breed: petForm.elements["breed"].value,
    gender: petForm.elements["gender"].value,
    color: petForm.elements["color"].value.trim(),
    service: petForm.elements["service"].value
  };

  if (!pet.name || !pet.age || !pet.breed || !pet.service) {
    alert("Please fill all required fields!");
    return;
  }

  pets.push(pet);
  savePets();
  displayRow(pet);
  petForm.reset();
}

function displayRow(pet) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", pet.id);
  row.innerHTML = `
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.gender}</td>
    <td>${pet.breed}</td>
    <td>${pet.color}</td>
    <td>${pet.service}</td>
    <td>
      <button class="btn btn-danger btn-sm" onclick="deleteRow(${pet.id})">Delete</button>
    </td>
  `;
  petsTableBody.appendChild(row);
}

function deleteRow(id) {
  pets = pets.filter(pet => pet.id !== id);
  savePets();
  document.querySelector(`tr[data-id="${id}"]`)?.remove();
}

// =============================
// 🌙 DARK MODE LOGIC
// =============================
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  updateButtonText(savedTheme);
}

// Toggle between light/dark
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonText(newTheme);
  });
}

function updateButtonText(theme) {
  if (!themeToggle) return;
  themeToggle.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// =============================
// 🚀 INITIALIZATION
// =============================
window.onload = () => {
  populateServiceDropdown();
  pets.forEach(displayRow);
};
