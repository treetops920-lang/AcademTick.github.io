console.log("submit.js loaded");

document
  .getElementById("ticketForm")
  .addEventListener("submit", submitTicket);

function submitTicket(event) {
  event.preventDefault();

  console.log("Form submitted");

  const ticket = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    category: document.getElementById("category").value,
    building: document.getElementById("building").value,
    room: document.getElementById("room").value,
    requester: document.getElementById("requester").value,
    submitTime: Math.floor(Date.now() / 1000),
    status: "pending"
  };

  console.log("Ticket object:", ticket);

  fetch("/submit-ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticket)
  })
  .then(res => res.json())
  .then(data => {
    console.log("Ticket submitted:", data);
  })
  .catch(err => {
    console.error("Error submitting ticket:", err);
  });
}