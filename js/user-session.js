document.addEventListener("DOMContentLoaded", async () => {

  const loggedInEmail = sessionStorage.getItem("loggedInEmail");

  if (!loggedInEmail) return;

  let user = null;

  const files = [
    "data/students.json",
    "data/teachers.json",
    "data/administration.json"
  ];

  for (const file of files) {
    try {

      const response = await fetch(file);
      const data = await response.json();

      user = data.find(u => u.email === loggedInEmail);

      if (user) break;

    } catch(err) {
      console.error("Could not load", file);
    }
  }

  if (!user) return;

  /* ---------- USER NAME ---------- */

  const nameElements = document.querySelectorAll("#userName");

  nameElements.forEach(el => {
    el.textContent = user.name;
  });

  /* ---------- INITIALS ---------- */

  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .slice(0,2)
    .toUpperCase();

  const avatarElements = document.querySelectorAll("#userInitials");

  avatarElements.forEach(el => {
    el.textContent = initials;
  });

  /* ---------- OPTIONAL PROFILE PAGE DATA ---------- */

  const profileName = document.getElementById("profileName");
  if (profileName) profileName.textContent = user.name;

  const profileEmail = document.getElementById("profileEmail");
  if (profileEmail) profileEmail.textContent = user.email;

  const profileBuilding = document.getElementById("profileBuilding");
  if (profileBuilding) profileBuilding.textContent = user.building;

  const profileRole = document.getElementById("profileRole");
  if (profileRole) profileRole.textContent = user.role;

});