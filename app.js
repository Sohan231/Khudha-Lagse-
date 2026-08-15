document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  document.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("liked");
      btn.textContent = btn.classList.contains("liked") ? "♥" : "♡";
    });
  });

  const cartCount = document.querySelector(".cart-count");
  document.querySelectorAll(".restaurant-card").forEach(card => {
    card.addEventListener("dblclick", () => {
      const current = Number(cartCount?.textContent || 0);
      if (cartCount) cartCount.textContent = current + 1;
    });
  });

  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.querySelector("#searchInput");
  const cards = [...document.querySelectorAll(".restaurant-card")];
  const emptyState = document.querySelector("#emptyState");

  function filterRestaurants(term = "") {
    const query = term.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card => {
      const haystack = `${card.dataset.name} ${card.dataset.category} ${card.textContent}`.toLowerCase();
      const match = !query || haystack.includes(query);
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      filterRestaurants(searchInput.value);
      document.querySelector("#restaurants")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".category-card").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      if (searchInput) searchInput.value = button.dataset.category;
      filterRestaurants(button.dataset.category);
      document.querySelector("#restaurants")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelectorAll(".password-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      button.textContent = input.type === "password" ? "👁" : "🙈";
    });
  });

  const signupForm = document.querySelector("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = document.querySelector("#signupPassword").value;
      const confirm = document.querySelector("#signupConfirm").value;
      const message = document.querySelector("#signupMessage");

      if (password !== confirm) {
        message.textContent = "Passwords do not match.";
        return;
      }

      message.textContent = "Account form is valid. Backend authentication will be connected next.";
      signupForm.reset();
    });
  }

  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.querySelector("#loginMessage");
      message.textContent = "Login form is valid. Backend authentication will be connected next.";
    });
  }
});
