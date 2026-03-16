console.log("Ticket marked solved");

document.addEventListener("DOMContentLoaded", () => {

  const closeBtn = document.getElementById("closeTicketBtn");

  closeBtn.addEventListener("click", () => {

    console.log("Ticket closed");

    const solveTime = Math.floor(Date.now() / 1000);

    console.log("Solve time:", solveTime);

        let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (tickets.length === 0) {
      console.log("No tickets found");
      return;
    }

    // get most recent ticket
    let ticket = tickets[tickets.length - 1];

    ticket.status = "Closed";
    ticket.resolvedAt = new Date().toISOString();

    localStorage.setItem("tickets", JSON.stringify(tickets));

    console.log("Updated ticket:", ticket);

  });

});