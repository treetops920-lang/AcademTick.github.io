document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const userInput = document.getElementById("email");
  const passInput = document.getElementById("password");

  // Safety check
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = userInput.value.trim();
    const pass = passInput.value.trim();

    // ADMIN LOGIN
    if (user === "admin" && pass === "test") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "admin");
      window.location.assign("main.html");
      return;
    }
    if (user === "admin_kid" && pass === "TickBot") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "kid-student");
      window.location.assign("kids-dash.html");
      return;
    }

    // Regular user (any non-empty login)
    if (user && pass) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "user");
      window.location.assign("main.html");
      return;
    }

    alert("Invalid login.");
  });
});