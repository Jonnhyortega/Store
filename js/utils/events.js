import { obtenerDatos } from "./api.js";
import { createCardTemplate } from "../components/card.js";
import { saveToLocalStorage } from "./storage.js";
import { getRandomInt } from "./helpers.js";
import { arrayCart, renderArrayCart } from "./cart.js";
import { renderLoader } from "./loader.js";
import {
  arrayCienciaFiccion,
  arrayComedia,
  arrayDrama,
  arrayRomance,
  arrayWestern,
  arrayTerror,
  arrayThriller,
  arrayAll,
  arrayAccion,
} from "../data/arrays.js";

// FUNCTION TO RENDER MOVIES
export async function renderMovie(place, array) {
  place.innerHTML = "";
  array = array;

  for (const movie of array) {
    try {
      const movieToRender = await obtenerDatos(movie);
      if (movieToRender) {
        place.innerHTML += createCardTemplate(movieToRender);
      } else {
        console.log(`No se pudo renderizar la película: ${movie}`);
      }
    } catch (error) {
      place.innerHTML += renderLoader;
      console.error(`Error al renderizar la película ${movie}:`, error);
    }
  }
  addEventListenersToButtons();
}

//FUNCTION TO

// FUNCTIONS TO SEARCH MOVIES
export async function searchMovie() {
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    let input = document.querySelector("#input-search-movie");
    let searchMoviesHTML = document.querySelector("#container-search-movies");

    // Clear the container and show the loader
    searchMoviesHTML.innerHTML = renderLoader();

    obtenerDatos(input.value)
      .then((data) => {
        if (!data) {
          searchMoviesHTML.innerHTML = `<p>La película que buscó no ha sido encontrada, por favor vuelva a intentarlo.</p>`;
          return;
        }
        if (data.Poster === "N/A") {
          searchMoviesHTML.innerHTML = `
        <span>${data.Title} no es una película, por favor ingrese un nombre válido</span>`;
          return;
        }
        searchMoviesHTML.innerHTML = `${createCardTemplate(data)}`;
        addEventListenersToButtons();
      })
      .catch((error) => {
        searchMoviesHTML.innerHTML = `<p>Ocurrió un error al buscar la película. Por favor, inténtelo nuevamente.</p>`;
        console.error("Error fetching movie data:", error);
      });
  });
}

// FUNCTION TO FILTER MOVIES FOR CATEGORIES
export function filterMovies() {
  let containerMainMovies = document.querySelector("#list-main-movies");
  let genreSelect = document.querySelector("#genre-select");
  let filterButton = document.querySelector("#filter-button")
  renderMovie(containerMainMovies, arrayAll);
  
  filterButton.addEventListener("click", () => {
    let selectedValue = genreSelect.value;
    switch (selectedValue) {
      case "all":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayAll);
        break;
      case "action":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayAccion);
        break;
      case "science-fiction":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayCienciaFiccion);
        break;
      case "comedy":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayComedia);
        break;
      case "drama":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayDrama);
        break;
      case "romance":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayRomance);
        break;
      case "western":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayWestern);
        break;
      case "horror":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayTerror);
        break;
      case "thriller":
        containerMainMovies.innerHTML = "";
        renderMovie(containerMainMovies, arrayThriller);
        break;
      default:
        containerMainMovies.innerHTML = "";
        console.log("Género no reconocido");
    }
  });
}

// FUNCTIONS GALLERY POSTERS
export function addEventListenersToPosters() {
  let posters = document.querySelectorAll(".poster");
  posters.forEach((poster) => {
    poster.addEventListener("click", (e) => {
      let movieSelect = e.target.id;
      let searchMoviesHTML = document.querySelector("#container-search-movies");
      let section = document.getElementById("search-movies");
      searchMoviesHTML.innerHTML = "";

      obtenerDatos(movieSelect).then((data) => {
        if (!data) {
          return;
        }
        searchMoviesHTML.innerHTML = `${createCardTemplate(data)}`;
        addEventListenersToButtons();
        section.scrollIntoView({ behavior: "smooth" });
      });
    });
  });
}

// FUNCTION TO ADD MOVIE TO ARRAY CART
export function addEventListenersToButtons() {
  const btnAdd = document.querySelectorAll(".btn-add");
  btnAdd.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const movieTitle = e.currentTarget.id;
      obtenerDatos(movieTitle).then((data) => {
        if (!data) return;
        let existingMovie = arrayCart.find(
          (movie) => movie.Title === data.Title
        );
        if (!existingMovie) {
          let price = getRandomInt(2000, 10000);
          data.price = price;
          data.cantidad = 1;
          arrayCart.push(data);
        } else {
          console.log("La película ya se encuentra en el carrito.");
        }
        saveToLocalStorage("arrayCart", arrayCart);
        renderArrayCart();
      });
    });
  });
}

// FUNCTION TO !STOP.PROPAGATION
export function avoidClosingMenu() {
  document.querySelector("#dropdown-cart").addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
