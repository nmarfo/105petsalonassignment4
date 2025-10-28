// const form = document.getElementById("servicesForm");
// const tableBody = document.querySelector("#servicesTable tbody");

// let services = JSON.parse(localStorage.getItem("services")) || [];

// function saveToStorage() {
//   localStorage.setItem("services", JSON.stringify(services));
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const name = document.getElementById("serviceName").value.trim();
//   const desc = document.getElementById("serviceDescription").value.trim();
//   const price = parseFloat(document.getElementById("servicePrice").value).toFixed(2);

//   if (!name || !desc || !price) return alert("Please fill all fields!");

//   const service = { id: Date.now(), name, desc, price };
//   services.push(service);
//   saveToStorage();
//   displayService(service);
//   form.reset();
// });

// function displayService(service) {
//   const row = document.createElement("tr");
//   row.setAttribute("data-id", service.id);
//   row.innerHTML = `
//     <td>${service.name}</td>
//     <td>${service.desc}</td>
//     <td>${service.price}</td>
//     <td><button class="btn btn-danger btn-sm" onclick="deleteService(${service.id})">Delete</button></td>
//   `;
//   tableBody.appendChild(row);
// }

// function deleteService(id) {
//   services = services.filter(s => s.id !== id);
//   saveToStorage();
//   document.querySelector(`tr[data-id="${id}"]`)?.remove();
// }

// window.onload = () => {
//   services.forEach(displayService);
// };


//select form by ID using jQuery
$("#servicesForm").on("submit", function(event){
  event.preventDefault();
  
  // Test the save button
  //console.log("Save button clicked");
  const serviceName = $("#serviceName").val().trim();
  const serviceDescription = $("#serviceDescription").val().trim();
  const servicePrice = $("#servicePrice").val().trim();

  console.log(`Service Name: ${serviceName}, Description: ${serviceDescription}, Price: ${servicePrice}`);

  // 1. Remove previous error highlights
  $("#serviceName, #serviceDescription, #servicePrice").removeClass("is-invalid");

  // Convert price to number for accurate validation
  const priceValue = parseFloat(servicePrice);

  // 2. Validate the values
  if(!serviceName || !serviceDescription || isNaN(priceValue) || priceValue <= 0){
    // // Highlight invalid fields instead of alert
     $("#serviceName").addClass("is-invalid");
     $("#serviceDescription").addClass("is-invalid");
     $("#servicePrice").addClass("is-invalid"); 
    return; // stop here, don’t save
  } 
  else {
    // 3. Save the service - Assignment 3
    const newService = new Service(serviceName, serviceDescription, priceValue);
    console.log("Service has been saved:", newService);
  }

  // 4. Clear the form
  $("#servicesForm")[0].reset();

  // Remove red borders
  $("#serviceName, #serviceDescription, #servicePrice").removeClass("is-invalid");
});