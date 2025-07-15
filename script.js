// Featured Section: Top 4 products

const productGrid = document.getElementById("product-grid");
var menuToggle = document.querySelector(".menu-toggle");
var mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", function () {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
});

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=4"
    );
    const data = await response.json();

    const products = data.data;

    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <div class="product-top">
          <span class="product-label">BEST SELLER</span>
          <span class="heart-icon">
              <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.8 4.6c-1.5-1.4-3.9-1.4-5.4 0l-.9.9-.9-.9c-1.5-1.4-3.9-1.4-5.4 0-1.6 1.5-1.6 3.9 0 5.4l6.3 6.3 6.3-6.3c1.6-1.5 1.6-3.9 0-5.4z"/>
              </svg>
            </span>
          <img src="${product.image}" alt="Product Image" class="product-img" />
        </div>
        <div class="product-bottom">
          <h4 class="product-name">${product.text}</h4>
          <p class="product-price">$${(index + 1) * 10}</p>
        </div>
      `;

      productGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    productGrid.innerHTML =
      '<p style="color: red;">Could not load featured products.</p>';
  }
}

fetchProducts();
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector(".right-arrow");
var peoductGrid = document.getElementById("product-grid");

leftArrow.addEventListener("click", function () {
  const scrollAmount = peoductGrid.clientWidth;
  peoductGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

rightArrow.addEventListener("click", function () {
  const scrollAmount = peoductGrid.clientWidth;
  peoductGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
});


const listingGrid = document.getElementById("product-listing-grid");
const perPageDropdown = document.getElementById("products-per-page");

async function fetchListingProducts(pageSize = 14) {
  try {
    const response = await fetch(
      `https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=${pageSize}`
    );
    const data = await response.json();
    const products = data.data;

    listingGrid.innerHTML = ""; // Clear grid

    products.forEach((product, index) => {
      // Insert ad after 5th card
      if (index === 5) {
        const ad = document.createElement("div");
        ad.classList.add("ad-card");
        ad.innerHTML = `
          <button class="ad-close">×</button>
          <h3 class="ad-title">Special Offer</h3>
          <button class="ad-cta">Check this out</button>
        `;
        listingGrid.appendChild(ad);
      }

      const card = document.createElement("div");
      card.classList.add("product-listing-card");

      card.innerHTML = `
        <div class="product-top">
        <span class="product-id">ID: ${String(index + 1).padStart(2, "0")}</span>

          <img src="${product.image}" alt="Product Image" class="product-img" />
        </div>
      `;
      //  Add click handler to show modal
      card.addEventListener("click", () => {
        const modal = document.getElementById("product-modal");
        const modalImg = modal.querySelector(".modal-img");
        const modalId = modal.querySelector(".modal-id");

        modalImg.src = product.image;
        modalId.textContent = `ID: ${String(index + 1).padStart(2, "0")}`;
        modal.classList.remove("hidden");
      });

      listingGrid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading products:", err);
    listingGrid.innerHTML = `<p style="color:red;">Failed to load product listing.</p>`;
  }
}

fetchListingProducts(); // Initial fetch

perPageDropdown.addEventListener("change", (e) => {
  const pageSize = parseInt(e.target.value, 10);
  fetchListingProducts(pageSize);
});

//  Close modal button
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-modal");
  const closeBtn = modal.querySelector(".modal-close");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Optional: Click outside content to close
  modal.addEventListener("click", (e) => {
    if (e.target.id === "product-modal") {
      modal.classList.add("hidden");
    }
  });
});
