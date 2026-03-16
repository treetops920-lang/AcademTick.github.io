document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const userInput = document.getElementById("email");
  const passInput = document.getElementById("password");

  console.log("Login JS loaded");
  console.log({
    formFound: !!form,
    emailFound: !!userInput,
    passFound: !!passInput
  });

  if (!form || !userInput || !passInput) {
    console.error("Login elements not found. Check .login-form, #email, #password in your HTML.");
    return;
  }

  function makeInitials(name) {
    if (!name) return "?";

    return name
      .trim()
      .split(/\s+/)
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function saveSession(user, role) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("loggedInEmail", user.email || "");
    sessionStorage.setItem("displayName", user.name || "User");
    sessionStorage.setItem("userInitials", makeInitials(user.name || "User"));
    sessionStorage.setItem("userData", JSON.stringify(user));
  }

  async function loadUsers() {
    const files = [
      { path: "json/students_clean.json", role: "student" },
      { path: "json/teachers_clean.json", role: "teacher" },
      { path: "json/administration_clean.json", role: "admin" },
      { path: "json/additional_staff_clean.json", role: "staff" }
    ];

    let allUsers = [];

    for (const file of files) {
      try {
        const response = await fetch(file.path);

        if (!response.ok) {
          console.warn(`Could not load ${file.path}`);
          continue;
        }

        const data = await response.json();

        const taggedUsers = data.map(user => ({
          ...user,
          loginRole: file.role
        }));

        allUsers = allUsers.concat(taggedUsers);
      } catch (err) {
        console.error(`Could not load ${file.path}:`, err);
      }
    }

    return allUsers;
  }

  function isK5Student(user) {
    const grade = (user.grade || "").toString().trim().toLowerCase();

    const elementaryGrades = [
      "k",
      "kg",
      "K",
      "kindergarten",
      "1",
      "2",
      "3",
      "4",
      "5"
    ];

    return elementaryGrades.includes(grade);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = userInput.value.trim().toLowerCase();
    const password = passInput.value.trim();

    console.log("Attempt login:", { email, passLen: password.length });

    // Special hardcoded admin
    if (email === "admin" && password === "test") {
      const adminUser = {
        name: "Admin User",
        email: "admin@academtick.local"
      };

      saveSession(adminUser, "admin");
      window.location.href = "main.html";
      return;
    }

    // Special hardcoded kid admin
    if (email === "admin_kid" && password === "TickBot") {
      const kidAdminUser = {
        name: "Kid Admin",
        email: "admin_kid@academtick.local"
      };

      saveSession(kidAdminUser, "kid-student");
      window.location.href = "kids-dash.html";
      return;
    }

    // Everyone in JSON files uses test1
    if (password !== "test1") {
      alert("Invalid email or password.");
      return;
    }

    const users = await loadUsers();

    const matchedUser = users.find(user =>
      (user.email || "").toLowerCase() === email
    );

    if (!matchedUser) {
      alert("User not found.");
      return;
    }

    saveSession(matchedUser, matchedUser.loginRole);

    // K-5 students go to kids dashboard
    if (matchedUser.loginRole === "student" && isK5Student(matchedUser)) {
      window.location.href = "kids-dash.html";
      return;
    }

    // Everyone else
    window.location.href = "main.html";
  });
});