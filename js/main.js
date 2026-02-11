export function countOpenTickets(tickets) {
    return tickets.filter(t => t.status === "open").length
}

export function countAssignedToUser(tickets, userId) {
  return tickets.filter(t => t.assignedTo === userId).length;
}

export function countHighPriority(tickets) {
  return tickets.filter(t => t.priority === "high").length;
}


const fakeTickets = [
  { status: "open", priority: "high", assignedTo: "elm" },
  { status: "closed", priority: "low", assignedTo: "weston" },
  { status: "open", priority: "high", assignedTo: "weston" },
];

console.log(countOpenTickets(fakeTickets));       // 2
console.log(countAssignedToUser(fakeTickets, "weston")); // 1
console.log(countHighPriority(fakeTickets));     // 2
