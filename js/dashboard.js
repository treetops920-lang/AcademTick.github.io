console.log("dashboard.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    console.log("Tickets:", tickets);

    const tableBody = document.getElementById("ticketTableBody");

    if (!tableBody) {
        console.log("No table body found");
        return;
    }

    // clear existing rows
    tableBody.innerHTML = "";

    // loop through tickets
    tickets.forEach((ticket) => {

        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${ticket.title}</td>
      <td>${ticket.priority}</td>
      <td>${ticket.status}</td>
    `;

        tableBody.appendChild(row);

    });


});

document.getElementById("uploadTickets")
  .addEventListener("change", function (event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

      const tickets = JSON.parse(e.target.result);

      console.log("Loaded tickets:", tickets);

      displayTickets(tickets);
    };

    reader.readAsText(file);
});

function displayTickets(tickets) {

  const tableBody = document.getElementById("ticketTableBody");

  tableBody.innerHTML = "";

  tickets.forEach((ticket, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>#${index + 1000}</td>
      <td>${ticket.title}</td>
      <td>${ticket.category}</td>
      <td>${ticket.priority}</td>
      <td>${ticket.status}</td>
      <td>${new Date(ticket.submitTime * 1000).toLocaleString()}</td>
      <td><button>Open</button></td>
    `;

    tableBody.appendChild(row);
  });
}