document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const userInput = document.getElementById("email");      // <-- your username field
  const passInput = document.getElementById("password");   // <-- your password field

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = userInput.value.trim();
    const pass = passInput.value.trim();

    // demo creds
    if (user.toLowerCase() === "admin" && pass === "test") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "admin");
      window.location.assign("main.html");
      return;
    }

    // non-admin user example (optional)
    if (user && pass) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "user");
      window.location.assign("main.html");
      return;
    }

    alert("Invalid login.");
  });
});