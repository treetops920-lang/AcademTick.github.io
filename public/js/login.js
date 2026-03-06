document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const userInput = document.getElementById("email");
  const passInput = document.getElementById("password");

  // Debug: confirm the JS is actually running and elements exist
  console.log("Login JS loaded");
  console.log({ formFound: !!form, emailFound: !!userInput, passFound: !!passInput });

  if (!form || !userInput || !passInput) {
    console.error("Login elements not found. Check .login-form, #email, #password in your HTML.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = userInput.value.trim();
    const pass = passInput.value.trim();

    console.log("Attempt login:", { user, passLen: pass.length });

    // ADMIN
    if (user === "admin" && pass === "test") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "admin");
      window.location.href = "main.html";
      return;
    }

    // KID ADMIN (goes to kids dashboard)
    if (user === "admin_kid" && pass === "TickBot") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "kid-student");
      window.location.href = "./kids-dash.html";   // note the ./ helps relative paths
      return;
    }

    // Regular user
    if (user && pass) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "user");
      window.location.href = "main.html";
      return;
    }

    alert("Invalid login.");
  });
});