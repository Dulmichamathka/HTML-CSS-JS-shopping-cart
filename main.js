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

let cartIcon = document.querySelector(".cart-button");
let cartModel = document.querySelector(".cart-model");
let cartClose = document.querySelector(".close-btn");

cartIcon.addEventListener("click", () => {
  cartModel.classList.add("open-cart");
});
