console.log("dashboard.js loaded");

document.addEventListener("DOMContentLoaded", () => {

  const tableBody = document.getElementById("ticketTableBody");
  const uploadInput = document.getElementById("uploadTickets");

  if (!tableBody) {
    console.log("No table body found");
    return;
  }

  // -------------------------
  // 1. TRY LOAD DEFAULT JSON
  // -------------------------
  fetch("/tickets")
    .then(res => res.json())
    .then(data => {
      console.log("Loaded from server:", data);
      displayTickets(data);
    })
    .catch(err => {
      console.error("Error loading tickets:", err);
    });
  // -------------------------
  // 2. HANDLE FILE UPLOAD
  // -------------------------
  if (uploadInput) {
    uploadInput.addEventListener("change", function (event) {

      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = function (e) {

        const tickets = JSON.parse(e.target.result);

        console.log("Loaded uploaded tickets:", tickets);

        displayTickets(tickets);
      };

      reader.readAsText(file);
    });
  }

});


// -------------------------
// DISPLAY FUNCTION
// -------------------------
function displayTickets(tickets) {

  const tableBody = document.getElementById("ticketTableBody");

  tableBody.innerHTML = "";

  tickets.forEach((ticket, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>#${index + 1000}</td>
      <td>${ticket.title || "N/A"}</td>
      <td>${ticket.category || "N/A"}</td>
      <td>${ticket.priority || "N/A"}</td>
      <td>${ticket.status || "N/A"}</td>
      <td>${ticket.submitTime ? new Date(ticket.submitTime * 1000).toLocaleString() : "N/A"}</td>
      <td><button class="open-btn" data-index="${index}">Open</button></td>
    `;

    tableBody.appendChild(row);
  });
  const buttons = document.querySelectorAll(".open-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      const index = btn.getAttribute("data-index");
      const selectedTicket = tickets[index];

      console.log("Selected ticket:", selectedTicket);

      // save selected ticket
      localStorage.setItem("selectedTicket", JSON.stringify(selectedTicket));

      // go to resolve page
      window.location.href = "reslove.html";
    });
  });
}