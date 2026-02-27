console.log("Submit button clicked");


document.getElementById("ticketForm")
  .addEventListener("submit", submitTicket);

function submitTicket(event) {
    event.preventDefault();
}

const username = document.getElementById("username").value;
const location = document.getElementById("location").value;
const category = document.getElementById("category").value;
const urgency = document.getElementById("urgency").value;
const description = document.getElementById("description").value;

const submitTime = Math.floor(Date.now() / 1000);

const ticket = {
    username: username,
    location: location,
    category: category,
    urgency: urgency,
    description: description,
    submitTime: submitTime,
    status: "pending"
};

fetch("/submit-ticket", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(ticket)

    .then(res => res.json())
    .then(data => {
        console.log("Ticket submitted:", data);
    })
    .catch(err => {
        console.error("Error submitting ticket:", err);
    })
})