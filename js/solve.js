console.log("Ticket marked solved");

document.addEventListener("DOMContentLoaded", () => {

  const closeBtn = document.getElementById("closeTicketBtn");

  closeBtn.addEventListener("click", () => {

    console.log("Ticket closed");

    const solveTime = Math.floor(Date.now() / 1000);

    console.log("Solve time:", solveTime);

  });

});