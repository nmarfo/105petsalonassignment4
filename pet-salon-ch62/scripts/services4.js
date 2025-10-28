function clearInputs() {
  $("#serviceName").val("");
  $("#servicePrice").val("");
  $("#serviceDuration").val("");
  $("#serviceDesc").val("");
}

function showMessage(msg) {
  $("#result").text(msg);
}

// Custom validation using Bootstrap styles + extra checks
function validateForm() {
  const form = document.getElementById("serviceForm");
  // Trigger Bootstrap validation UI
  form.classList.add("was-validated");

  // Basic HTML5 validity
  if (!form.checkValidity()) return false;

  // Extra numeric checks
  const price = parseFloat($("#servicePrice").val());
  const duration = parseInt($("#serviceDuration").val(), 10);

  if (isNaN(price) || price <= 0) return false;
  if (isNaN(duration) || duration < 1) return false;

  return true;
}

// --- Save (store as separate keys) ---
$("#saveBtn").on("click", function (e) {
  e.preventDefault();

  if (!validateForm()) {
    showMessage("Please fix validation errors.");
    return;
  }

  const name     = $("#serviceName").val().trim();
  const price    = $("#servicePrice").val().trim();
  const duration = $("#serviceDuration").val().trim();
  const desc     = $("#serviceDesc").val().trim();

  // Save to localStorage using individual keys 
  localStorage.setItem("svc_name", name);
  localStorage.setItem("svc_price", price);
  localStorage.setItem("svc_duration", duration);
  localStorage.setItem("svc_desc", desc);

  // Clear inputs after save
  clearInputs();

  // Reset validation UI for the now-empty form
  document.getElementById("serviceForm").classList.remove("was-validated");

  showMessage("Service saved to localStorage and inputs cleared.");
});

// --- Get (read and display nicely) ---
$("#getBtn").on("click", function (e) {
  e.preventDefault();

  const name     = localStorage.getItem("svc_name");
  const price    = localStorage.getItem("svc_price");
  const duration = localStorage.getItem("svc_duration");
  const desc     = localStorage.getItem("svc_desc");

  if (!name && !price && !duration && !desc) {
    showMessage("No saved service found.");
    return;
  }

  showMessage(
    `Service: ${name || "(no name)"} | $${price || "0"} | ${duration || "0"} min | ${desc || "(no description)"}`
  );
});

// --- Delete (remove all service keys) ---
$("#deleteBtn").on("click", function (e) {
  e.preventDefault();

  localStorage.removeItem("svc_name");
  localStorage.removeItem("svc_price");
  localStorage.removeItem("svc_duration");
  localStorage.removeItem("svc_desc");

  showMessage("Deleted the saved service from localStorage.");
});

// --- Clear inputs only (no storage changes) ---
$("#clearBtn").on("click", function () {
  clearInputs();
  // Also reset validation UI
  document.getElementById("serviceForm").classList.remove("was-validated");
  showMessage("Inputs cleared.");
});