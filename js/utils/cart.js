import { avoidClosingMenu } from "./events.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage.js";
import { obtenerDatos } from "./api.js";

export let arrayCart = loadFromLocalStorage("arrayCart") || [];

// Función para renderizar el carrito
export function renderArrayCart() {
  avoidClosingMenu();
  let totalProductsCart = 0;
  let cart = document.querySelector("#dropdown-cart");
  let numberProducts = document.querySelector("#number-products");

  cart.innerHTML = "";
  if (arrayCart.length === 0) {
    cart.innerHTML = `<span id="cart-empty">Carrito vacío</span>`;
    numberProducts.textContent = totalProductsCart;
  } else if(arrayCart.length > 0) {
    cart.innerHTML = `<p>Productos <i class="fa-brands fa-product-hunt"></i></p>`;
    arrayCart.forEach((product) => {
      cart.innerHTML += `
        <div id="movie-add">
          <img loading="lazy" src="${product.Poster}" alt="${product.Title}">
          <div id="movie-add-buttons">
            <button class="btn-increment" data-title="${product.Title}"><i class="fa-solid fa-plus"></i></button>
            <span>${product.cantidad}</span>
            <button class="btn-decrement" data-title="${product.Title}"><i class="fa-solid fa-minus"></i></button>
          </div>
          <div>
            <span id="sub-total">Sub-total</span>
            <span id="sub-total">$${product.price*product.cantidad}</span>
          </div>
        </div>
      `;
      return 
    });

    // Obtener total de la compra 
    let total = 0;
    arrayCart.forEach((movie) => {
      let totalPrice = movie.price * movie.cantidad;
      totalProductsCart += movie.cantidad;
      total += totalPrice;
    });

    numberProducts.textContent = totalProductsCart;

    cart.innerHTML += `
      <div id="container-total">
        <p>${" $" + total}</p>
        <button id="buy-button"><i class="fa-solid fa-bag-shopping"></i></button>
        <button id="delete-all"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;

    deleteAllProducts();
    addEventListenersToCartButtons();
  }
}

// Función para agregar eventos a los botones del carrito
function addEventListenersToCartButtons() {
  document.querySelectorAll(".btn-increment").forEach((button) => {
    button.addEventListener("click", (e) => {
      const title = e.currentTarget.getAttribute("data-title");
      const movie = arrayCart.find((m) => m.Title === title);
      if (movie) {
        movie.cantidad += 1;
        saveToLocalStorage("arrayCart", arrayCart);
        renderArrayCart();
      }
    });
  });

  document.querySelectorAll(".btn-decrement").forEach((button) => {
    button.addEventListener("click", (e) => {
      const title = e.currentTarget.getAttribute("data-title");
      const movie = arrayCart.find((m) => m.Title === title);
      if (movie) {
        if (movie.cantidad > 1) {
          movie.cantidad -= 1;
        } else {
          arrayCart = arrayCart.filter((m) => m.Title !== title);
        }
        saveToLocalStorage("arrayCart", arrayCart);
        renderArrayCart();
      }
    });
  });
}

// Función para eliminar todos los productos del carrito
function deleteAllProducts() {
  document.querySelector("#delete-all").addEventListener("click", () => {
    document.querySelector("#dropdown-cart").innerHTML = `
      <p>¿Estás seguro?</p>
      <div>
        <button id="vaciar" class="deleteProducts"><i class="fa-solid fa-circle-check"></i></button>
        <button id="cancelar" class="deleteProducts"><i class="fa-solid fa-circle-xmark"></i></button>
      </div>
    `;
    document.querySelectorAll(".deleteProducts").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (e.currentTarget.id === "vaciar") {
          arrayCart = [];
          saveToLocalStorage("arrayCart", arrayCart);
          renderArrayCart();
        } else if (e.currentTarget.id === "cancelar") {
          renderArrayCart();
        }
      });
    });
  });
}



// Función para obtener un número aleatorio entre un rango
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
