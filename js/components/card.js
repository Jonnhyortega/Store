
export function createCardTemplate(object) {
     function renderStarsRate(rated) {
        switch (true) {
          case rated >= 0 && rated <= 1:
            return `⭐`;
          case rated > 1 && rated <= 3:
            return `⭐⭐`;
          case rated > 3 && rated <= 7:
            return `⭐⭐⭐`;
          case rated > 7 && rated <= 9:
            return `⭐⭐⭐⭐`;
          case rated > 9:
            return `⭐⭐⭐⭐⭐`;
          case rated == "N/A":
            return `❗`;
          default:
            return `❗`;
        }
      }
    return `
      <div id="movie">
          <img loading="lazy" src="${object.Poster}" alt="${object.Title}">
          <div>
              <div>        
                  <span>${object.Title} - ${object.Year}</span>
                  <span>${renderStarsRate(object.imdbRating)}</span>
                  <button id="${object.Title}" class="btn-add"><i class="fa-solid fa-cart-plus"></i>
                  </button>
              </div>
          </div>
       </div>
    `;
  }
  