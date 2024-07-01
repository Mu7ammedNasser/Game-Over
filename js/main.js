class GamesDetails {
  async getGameDetails(id) {
    this.showLoading();
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4c84fca96amshfb2f7c3c5a4a55dp10e6f0jsnd0b9194dc270",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      this.displayGameDetails(result);
      $(".games-details").removeClass("d-none");
      this.hideLoading();
    } catch (error) {
      console.error(error);
    }
  }

  displayGameDetails(data) {
    let boxOfDetail = `
        <div class="game-image  col-lg-4">
          <img src="${data.thumbnail}" alt="${data.title}" />
        </div>
        <div class="game-details  col-lg-8">
          <h3 class="h2">Title: ${data.title}</h3>
          <p>Category : <span>${data.genre}</span></p>
          <p>Platform : <span>${data.platform}</span></p>
          <p>Status : <span>${data.status}</span></p>
          <p>${data.description}</p>
          <a class="alert-primary" href="${data.game_url}" target="_blank">Show Game</a>
        </div>
      `;
    document.getElementById("game-details").innerHTML = boxOfDetail;
  }

  showLoading() {
    $(".loading").removeClass("d-none");
  }

  hideLoading() {
    $(".loading").addClass("d-none");
  }
}

let details = new GamesDetails();

class GamesCards extends GamesDetails {
  constructor() {
    super();
    this.getGameCards("mmorpg");
  }

  async getGameCards(category) {
    this.showLoading();
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4c84fca96amshfb2f7c3c5a4a55dp10e6f0jsnd0b9194dc270",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      this.displayGameCards(result, () => {
        $(".card").on("click", function () {
          const id = $(this).attr("id");
          details.getGameDetails(id);
        });
      });
      this.hideLoading();
    } catch (error) {
      console.error(error);
    }
  }

  displayGameCards(data, setupClickHandler) {
    let boxOfCards = ``;
    for (let i = 0; i < data.length; i++) {
      boxOfCards += `
          <div class="wow flipInX   col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
          <div class="card w-100" id="${data[i].id}">
            <img src="${data[i].thumbnail}" class="card-img-top" alt="" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${data[i].title}</h5>
              <p class="card-text flex-grow-1">${data[i].short_description}</p>
              <div class="my-footer d-flex justify-content-between">
                <a href="#" class="card-link mt-2">${data[i].genre}</a>
                <a href="#" class="card-link mt-2">${data[i].platform}</a>
              </div>
            </div>
          </div>
        </div>
        `;
    }
    document.getElementById("myCards").innerHTML = boxOfCards;
    setupClickHandler();
  }
}

let games = new GamesCards();

let navItem = document.querySelectorAll(".nav-item a");

for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", function (e) {
    let category = e.target.innerHTML;
    games.getGameCards(category);
    $(".nav-link").removeClass("active");
    $(e.target).addClass("active");
  });
}

$(document).on("click", ".exit-icon", function () {
  $(".games-details").addClass("d-none");
});
