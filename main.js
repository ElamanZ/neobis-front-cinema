const moviesContent = document.getElementById('movies-content');
const form = document.querySelector("form");
const searchInput = document.querySelector(".header__input");
const premiereMoviesBtn = document.getElementById('premiereMovies');
const anticipatedMoviesBtn = document.getElementById('anticipatedMovies');
const popularMoviesBtn = document.getElementById('popularMovies');
const realesesMonthMoviesBtn = document.getElementById('realesesMonthMovies');
const favoriteMoviesBtn = document.getElementById('favoriteMovies');

const infoDate = new Date();
const monthOfYear = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const month = monthOfYear[infoDate.getMonth()];
const year = infoDate.getFullYear();

const API_KEY = 'f8b7220a-ec1b-477a-a473-19c5fd9c1329';
const API_URL_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`;
const API_URL_ANTICIPATED = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1';
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_URL_RELEASES = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}`;

getMovies(API_URL_PREMIERES);

async function getMovies(url) {
    try {
        const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respData = await resp.json();
        console.log(respData); // Для отладки
        showMovies(respData);

    } catch (error) {
        console.error(error);
    }
}

function getClassByRate(rating) {
    if (rating >= 7) {
        return "green";
    } else if (rating > 5) {
        return "orange";
    } else if (rating < 5) {
        return "red";
    }
}


function showMovies(data, showFavorites = false) {
    moviesContent.innerHTML = "";
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    const items = showFavorites ? favoriteMovies : data.releases || data.items || data.films;
    items.forEach((movie) => {
        const movieId = movie.kinopoiskId || movie.filmId;
        const isFavorite = favoriteMovies.some(favMovie => favMovie.kinopoiskId === movieId);

        const movieElement = document.createElement("div");
        movieElement.dataset.kinopoiskId = movieId;
        movieElement.innerHTML = `
            <div class="movie">
                <div class="movie__cover-inner">
                    <img class="movie__cover" src="${movie.posterUrl}" alt="logo">
                </div>
                <div class="movie__info">
                    <div class="movie_content-info">
                        <div class="movie__title">${movie.nameRu}</div>
                        <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                        <div class="movie__year">${movie.year}</div>

                        ${movie.rating !== undefined && movie.rating !== null ? `
                            <div class="movie__average
                            movie__average--${getClassByRate(movie.rating)}">
                                ${movie.rating}
                            </div>
                        ` : ''}

                    </div>
                  <div class="movie_content-favorite">
                    <img
                        class="favorite-btn"
                        data-kinopoisk-id="${movieId}" // Используйте movieId здесь
                        src="${isFavorite ? 'image/heart__red.png' : 'image/heart__white.png'}"
                        alt="logo_favorite"
                    >
                </div>
                </div>
            </div>
        `;

        const favoriteBtn = movieElement.querySelector(".favorite-btn");
        favoriteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isNowFavorite = toggleFavorite({ ...movie, kinopoiskId: movieId });
            favoriteBtn.src = isNowFavorite ? 'image/heart__red.png' : 'image/heart__white.png';
        });

        moviesContent.appendChild(movieElement);
    });
}

function toggleFavorite(movie) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const movieIndex = favoriteMovies.findIndex(favMovie => favMovie.kinopoiskId === movie.kinopoiskId);
    let isFavoriteNow;

    if (movieIndex === -1) {
        favoriteMovies.push(movie);
        isFavoriteNow = true;
    } else {
        favoriteMovies.splice(movieIndex, 1);
        if (isViewingFavorites()) {
            const movieElement = document.querySelector(`div[data-kinopoisk-id="${movie.kinopoiskId}"]`);
            if (movieElement) {
                movieElement.remove();
            } else {
                console.error('Element not found:', movie.kinopoiskId);
            }
        }
        isFavoriteNow = false;
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    return isFavoriteNow;
}

function isViewingFavorites() {
    return moviesContent.classList.contains('favorites-view');
}



function setActiveButton(buttonId) {
    // Удаление класса 'selected' у всех кнопок
    const navButtons = document.querySelectorAll('.nav__button');
    navButtons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Добавление класса 'selected' только к выбранной кнопке
    const selectedButton = document.getElementById(buttonId);
    selectedButton.classList.add('selected');
}

favoriteMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moviesContent.classList.add('favorites-view');
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    showMovies({ films: favoriteMovies }, true);

    setActiveButton('favoriteMovies');
});



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL_SEARCH}${searchInput.value}`;
    if (searchInput.value) {
        getMovies(apiSearchUrl);
        searchInput.value = "";
    }
});



premiereMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(API_URL_PREMIERES);
    setActiveButton('premiereMovies');
});

anticipatedMoviesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getMovies(API_URL_ANTICIPATED);
    setActiveButton('anticipatedMovies');
});

realesesMonthMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(API_URL_RELEASES);
    setActiveButton('realesesMonthMovies');
});

popularMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(API_URL_POPULAR);
    setActiveButton('popularMovies');
});