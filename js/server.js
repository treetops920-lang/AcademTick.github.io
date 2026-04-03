const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 THIS LINE FIXES YOUR PROBLEM
app.use(express.static(__dirname));


const FILE = path.join(__dirname, "json", "tickets.json");

// GET tickets
app.get("/tickets", (req, res) => {
    if (!fs.existsSync(FILE)) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});
// POST new ticket
app.post("/tickets", (req, res) => {
    const newTicket = req.body;

    let tickets = [];

    if (fs.existsSync(FILE)) {
        tickets = JSON.parse(fs.readFileSync(FILE));
    }

    tickets.push(newTicket);

    fs.writeFileSync(FILE, JSON.stringify(tickets, null, 2));

    res.json({ message: "Ticket saved" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});