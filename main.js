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

//retrive cart items from the local storage

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let total = 0;
let itemCount = 0;

// add item to the cartitems array

function addToCart(productCard) {
  const name = productCard.querySelector(".product-name").textContent;
  const image = productCard.querySelector(".product-image").src;
  const priceText = productCard.querySelector(".product-price").textContent;
  const price = parseFloat(priceText.replace("Rs.", ""));

  const existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      name,
      image,
      price,
      quantity: 1,
    });
  }

  updateLocalStore();
  updateCartDisplay();
}

//update local storage

function updateLocalStore() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

//remove item from the cart

function removeItem(name) {
  cartItems = cartItems.filter((item) => item.name !== name);

  updateLocalStore();
  updateCartDisplay();
}

//onload cart amount display

//Animation when adding item to the cart

//update the calss display
function updateCartDisplay() {
  const cartList = document.getElementById("cart-items");
  const totalElement = document.getElementById("total-price");
  const countElement = document.getElementById("cart-count");

  if (!cartList || !totalElement || !countElement) {
    console.error("Cart display elements not found in the document.");
    return;
  }

  cartList.innerHTML = "";

  total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
     <div class="cart-item-details">
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-price">Rs. ${item.price} &times; ${item.quantity}</div>
     </div>
     <div class="quantity-controls">
      <button onclick="changeQuantity('${item.name}',-1)">-</button>
      <button onclick="changeQuantity('${item.name}',1)">+</button>
     </div>
     <button class="remove-item" onclick="removeItem('${item.name}')">x</button>
    `;

    cartList.appendChild(li);
  });

  totalElement.textContent = total.toFixed(2);
  countElement.textContent = itemCount;
}

function changeQuantity(name, delta) {
  const item = cartItems.find((item) => item.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeItem(name);
    } else {
      updateLocalStore();
      updateCartDisplay();
    }
  }
}

window.onload = function () {
  updateCartDisplay();
};

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
