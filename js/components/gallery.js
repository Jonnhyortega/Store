import { obtenerDatos } from "../utils/api.js";
import { addEventListenersToButtons, addEventListenersToPosters } from "../utils/events.js";
import { createCardTemplate } from "./card.js";
// FUNCTION TO RENDER POSTER IN HERO SECTION
export async function renderGallery(array) {
    let numberArrayToRender = 0;
  
    const renderImages = async (movieArray) => {
      document.querySelector("#gallery-poster").innerHTML = "";
      for (const movie of movieArray) {
        try {
          const movieToRender = await obtenerDatos(movie);
          if (movieToRender) {
            document.querySelector("#gallery-poster").innerHTML += `
              ${createCardTemplate(movieToRender)}
            `;
          } else {
            console.log(`No se pudo renderizar la película: ${movie} en HERO`);
          }
        } catch (error) {
          console.error(
            `Error al renderizar la película en HERO ${movie}:`,
            error
          );
        }
      }
      addEventListenersToPosters();
      addEventListenersToButtons()
    };
  
    // Función para cambiar entre los diferentes arrays de películas
    const changeArray = () => {
      numberArrayToRender = (numberArrayToRender + 1) % array.length;
      renderImages(array[numberArrayToRender]);
      addEventListenersToPosters();
    };
  
    renderImages(array[numberArrayToRender]);
    setInterval(changeArray, 15000);
  }