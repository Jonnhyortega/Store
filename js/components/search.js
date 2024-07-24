// import { renderLoader } from "../utils/loader";

// // FUNCTIONS TO SEARCH MOVIES
// async function searchMovie() {
//     searchButton.addEventListener("click", () => {
//       let input = document.querySelector("#input-search-movie");
//       let searchMoviesHTML = document.querySelector("#container-search-movies");
//     //   searchMoviesHTML.innerHTML = renderLoader()
//       searchMoviesHTML.innerHTML = "";
//       obtenerDatos(input.value).then((data) => {
//         if (!data) {
//           searchMoviesHTML.innerHTML = `<p>La pelicula que busco no ha sido encontrada, por favor vuelva a intentarlo.</p>
//           `;
//         }
//         if (data.Poster === "N/A") {
//           searchMoviesHTML.innerHTML = `
//           <span>${data.Title} no es una pelicula, por favor ingrese un nombre valido </span>  
//         `;
//           return;
//         }
//         searchMoviesHTML.innerHTML = `
//           ${createCardTemplate(data)}
//         `;
//         addEventListenersToButtons();
//       });
//     });
//   }