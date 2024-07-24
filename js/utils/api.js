
export async function obtenerDatos(string) {
    const URL = "https://www.omdbapi.com/?apikey=712dcc23&t=";
    try {
      const response = await fetch(URL + string.replace(/ /g, "+"));
      if (!response.ok) {
        throw new Error("No se pudo acceder al servidor");
      }
      const data = await response.json();
      if (data.Response === "False") {
        console.log("No existe la película");
        return null;
      } else {
        return data;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return null;
    }
  }
  