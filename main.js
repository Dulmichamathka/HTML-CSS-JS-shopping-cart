// modal javascript

document.addEventListener("DOMContentLoaded", function () {
  const detailsButtons = document.querySelectorAll(".more-details");
  const modals = document.querySelectorAll(".modal");

  // go through each buttons and modals then finding modal for relavat id
  detailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-id");
      document.getElementById(modalId).style.display = "block";
    });
  });

  //close model when clicking the close button or outside of the modal

  modals.forEach((modal) => {
    const closeButton = modal.querySelector(".close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});

//cart open close toggle

let cartIcon = document.getElementById("cart-button");
let cartModel = document.querySelector(".cart-model");
let cartClose = document.querySelector(".close-btn");

cartIcon.addEventListener("click", () => {
  cartModel.classList.add("open-cart");
});

cartClose.onclick = () => {
  cartModel.classList.remove("open-cart");
};

//retrive cart items from the local storage

let cartItems = JSON.parse(localStorage.getItem("cartItems") || []);
let total = 0;
let itemCount = 0;

// add item to the cartitems array

function addToCart(productCard) {
  const name = productCard.querySelector(".product-name").textContent;
  const image = productCard.querySelector(".product-image").src;
  const priceText = productCard.querySelector(".product-price").textContent;
  const price = parseFloat(priceText.replace("$", ""));

  const existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name, image, price, quantity: 1 });
  }

  updateLocalStorage();
  UpdateCartDispaly();
  animateAddToCart();
}

function updateLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

window.onload = function () {};
