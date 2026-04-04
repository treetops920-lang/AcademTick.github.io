console.log("submit.js loaded");

document
  .getElementById("ticketForm")
  .addEventListener("submit", submitTicket);

function submitTicket(event) {
  event.preventDefault();

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

  // ✅ THIS replaces localStorage
  fetch("/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticket)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Saved to server:", data);
    })
    .catch(err => {
      console.error("Error:", err);
    });
}

/* TEMP DATABASE (until backend exists) */



console.log("Saved tickets:", tickets);

console.log("Ticket object:", ticket);



  /* document.getElementById("downloadTicketsBtn")
    .addEventListener("click", () => {

      let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

      const data = JSON.stringify(tickets, null, 2);

      const blob = new Blob([data], { type: "application/json" });

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = "tickets.json";

      link.click();

    });
*/
/* upove if=s chat gpt code*/
  /*
    fetch("/submit-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticket)
    })
  
  
  
  
      /* 
      TODO Bellow (after backend is finalized):
      Expect JSON response from /submit-ticket
    
      .then(res => res.json())
      .then(data => {
        console.log("Ticket submitted:", data);
      })
    
  
  
      .then(res => {
        console.log("Response status:", res.status);
        return res.text();
      })
      .then(text => {
        console.log("Raw response:", text);
      })
      .catch(err => {
        console.error("Error submitting ticket:", err);
      });
      */
