const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const ticketsPath = path.join(__dirname, "data", "tickets.json");

app.use(express.json());
app.use(express.static(__dirname));

app.post("/submit-ticket", (req, res) => {
  const newTicket = req.body;

  let tickets = [];

  if (fs.existsSync(ticketsPath)) {
    const data = fs.readFileSync(ticketsPath, "utf8");
    tickets = data ? JSON.parse(data) : [];
  }

  newTicket.id = Date.now();
  newTicket.status = "pending";

  tickets.push(newTicket);

  fs.writeFileSync(ticketsPath, JSON.stringify(tickets, null, 2));

  res.json({ success: true, ticket: newTicket });
});

app.get("/tickets", (req, res) => {
  if (!fs.existsSync(ticketsPath)) return res.json([]);

  const data = fs.readFileSync(ticketsPath, "utf8");
  const tickets = data ? JSON.parse(data) : [];

  res.json(tickets);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});