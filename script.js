document.addEventListener("DOMContentLoaded", () => {
    // ========================== 🛒 INITIALIZE CART ==========================
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ========================== 🪑 TABLE BOOKING ==========================
    const tables = document.querySelectorAll(".table");
    const bookNowBtn = document.getElementById("bookNowBtn");
    const popupForm = document.getElementById("popupForm");
    const reservationForm = document.getElementById("reservationForm");

    let selectedTable = null;

    if (tables.length && bookNowBtn) {
        tables.forEach(table => {
            table.addEventListener("click", () => {
                // 1. Highlight the table
                tables.forEach(t => t.classList.remove("selected"));
                table.classList.add("selected");
                
                // 2. Save table number
                selectedTable = table.dataset.table;
                
                // 3. Enable the button and update text
                bookNowBtn.disabled = false;
                bookNowBtn.textContent = `Book Table ${selectedTable}`;
            });
        });

        // 4. Open the form when button is clicked
        bookNowBtn.addEventListener("click", () => {
            if (selectedTable) {
                popupForm.classList.remove("hidden");
                // Ensure display is block/flex if CSS hidden uses display:none
                popupForm.style.display = "flex"; 
            } else {
                showToast("Please select a table first 🍰", "#e74c3c");
            }
        });

        // 5. Global function to close popup
        window.closePopup = function () {
            popupForm.classList.add("hidden");
            popupForm.style.display = "none";
            reservationForm.reset();
        };

        // 6. Handle Form Submission
        if (reservationForm) {
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

                localStorage.setItem("tableBooking", JSON.stringify(bookingData));
                window.location.href = "booking-details.html";
            });
        }
    }

    // ========================== 🛒 CART LOGIC ==========================
    // ... (Keep your existing updateBadge, showToast, and Menu Item listeners here)
    function updateBadge() {
        const cartLink = document.querySelector('a[href="cart.html"]');
        if (!cartLink) return;
        let badge = document.querySelector(".cart-count");
        if (!badge) {
            badge = document.createElement("span");
            badge.className = "cart-count";
            Object.assign(badge.style, {
                position: "absolute", top: "-8px", right: "-12px",
                background: "#f7b267", color: "white", fontSize: "0.7rem",
                padding: "2px 6px", borderRadius: "50%"
            });
            cartLink.style.position = "relative";
            cartLink.appendChild(badge);
        }
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
    }

    function showToast(message, color = "#f7b267") {
        const popup = document.createElement("div");
        popup.textContent = message;
        popup.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${color}; color: white; padding: 12px 18px; border-radius: 25px; font-weight: bold; z-index: 9999;`;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 2500);
    }

    updateBadge();
});

  function showToast(message, color = "#f7b267") {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.cssText = `
      position: fixed; top: 20px; right: 20px;
      background: ${color}; color: white; padding: 12px 18px;
      border-radius: 25px; font-weight: bold; z-index: 9999;
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
  }

  // Add to Cart Click Handler
  document.querySelectorAll(".menu-item button").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);

      if (!name || isNaN(price)) {
        console.error("Missing data attributes on button!");
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
      showToast(`✅ ${name} added to cart`);
    });
  });

  // Initial badge load
  updateBadge();
});
// ========================== 🪑 TABLE BOOKING ==========================
const tables = document.querySelectorAll(".table");
const bookNowBtn = document.getElementById("bookNowBtn");
const popupForm = document.getElementById("popupForm");
const reservationForm = document.getElementById("reservationForm");

let selectedTable = null;

if (tables.length && bookNowBtn) {
    tables.forEach(table => {
        table.addEventListener("click", () => {
            // 1. Highlight the table
            tables.forEach(t => t.classList.remove("selected"));
            table.classList.add("selected");
            
            // 2. Save table number
            selectedTable = table.dataset.table;
            console.log("Table selected:", selectedTable); // Debug check

            // 3. Enable the button
            bookNowBtn.disabled = false;
            bookNowBtn.textContent = `Book Table ${selectedTable}`;
        });
    });

    // 4. Open the form when button is clicked
    bookNowBtn.addEventListener("click", () => {
        if (selectedTable && popupForm) {
            popupForm.style.display = "flex"; // Forces the popup to show
            popupForm.classList.remove("hidden");
        } else {
            alert("Please select a table first! 🍰");
        }
    });
}


