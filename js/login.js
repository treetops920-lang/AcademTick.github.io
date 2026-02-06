document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");

  if (!form) return;

  // Create error message area (no HTML edits needed)
  const error = document.createElement("div");
  error.style.marginTop = "12px";
  error.style.fontWeight = "800";
  error.style.color = "#B91C1C";
  error.style.display = "none";
  form.appendChild(error);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = (emailEl.value || "").trim();
    const pass = (passEl.value || "").trim();

    // Clear old error
    error.style.display = "none";
    error.textContent = "";

    /* ======================
       DEMO LOGIN LOGIC
    ====================== */

    // Adult / Staff
    if (user === "admin" && pass === "test") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("username", "Admin");

      window.location.href = "main.html";
      return;
    }

    // Kid dashboard
    if (user === "admin_kid" && pass === "TickBot") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "kid");
      localStorage.setItem("username", "TickBot Helper");

      window.location.href = "kids-dash.html";
      return;
    }

    // Login failed
    error.textContent =
      "Login failed username or password incorrect.";
    error.style.display = "block";
  });
});
