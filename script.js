// ================================
// ☕ Sweet Bean Café — script.js (CLEAN & WORKING)
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================== 🪑 TABLE BOOKING ==========================
  const tables = document.querySelectorAll(".table");
  const bookNowBtn = document.getElementById("bookNowBtn");
  const popupForm = document.getElementById("popupForm");
  const reservationForm = document.getElementById("reservationForm");

  let selectedTable = null;

  if (tables.length && bookNowBtn && reservationForm) {

    tables.forEach(table => {
      table.addEventListener("click", () => {
        tables.forEach(t => t.classList.remove("selected"));
        table.classList.add("selected");
        selectedTable = table.dataset.table;
        bookNowBtn.disabled = false;
        bookNowBtn.textContent = `Book Table ${selectedTable}`;
      });
    });

    bookNowBtn.addEventListener("click", () => {
      if (!selectedTable) {
        alert("Please select a table first 🍰");
        return;
      }
      popupForm.classList.remove("hidden");
    });

    window.closePopup = function () {
      popupForm.classList.add("hidden");
      reservationForm.reset();
    };

    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const bookingData = {
        venue: "Sweet Bean Café",
        table: selectedTable,
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        date: document.getElementById("date").value,
        time: document.getElementById("time").value + " " + document.getElementById("ampm").value,
        people: document.getElementById("people").value
      };

      if (!bookingData.name || !bookingData.phone || !bookingData.date || !bookingData.time) {
        alert("Please fill in all details ☕");
        return;
      }

      localStorage.setItem("tableBooking", JSON.stringify(bookingData));
      window.location.href = "booking-details.html";
    });
  }

  // ========================== 🛒 CART SYSTEM ==========================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cart badge
  const cartLink = document.querySelector('a[href="cart.html"]');
  if (cartLink) {
    const badge = document.createElement("span");
    badge.className = "cart-count";
    badge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

    Object.assign(badge.style, {
      position: "absolute",
      top: "-8px",
      right: "-12px",
      background: "#f7b267",
      color: "white",
      fontSize: "0.7rem",
      padding: "2px 6px",
      borderRadius: "50%"
    });

    cartLink.style.position = "relative";
    cartLink.appendChild(badge);
  }

  function updateBadge() {
    const badge = document.querySelector(".cart-count");
    if (badge) {
      badge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    }
  }

  // Add to Cart buttons
  document.querySelectorAll(".menu-item button").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);

      if (!name || isNaN(price)) {
        alert("Menu item data missing ❌");
        return;
      }

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateBadge();

      alert(`✅ ${name} added to cart ☕`);
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  document.querySelectorAll(".menu-item button").forEach(btn => {
    btn.addEventListener("click", () => {

      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);

      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      saveCart();

      // Toast popup
      const popup = document.createElement("div");
      popup.textContent = `✅ ${name} added to cart`;
      popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f7b267;
        color: white;
        padding: 12px 18px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 9999;
      `;
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 2000);
    });
  });

});
