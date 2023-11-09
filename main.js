const moviesContent = document.getElementById('movies-content');
const form = document.querySelector("form");
const searchInput = document.querySelector(".header__input");
const premiereMoviesBtn = document.getElementById('premiereMovies')
const anticipatedMoviesBtn = document.getElementById('anticipatedMovies')
const popularMoviesBtn = document.getElementById('popularMovies')
const realesesMonthMoviesBtn = document.getElementById('realesesMonthMovies')
const favoriteBtn = document.getElementById('favorite-btn')

const infoDate = new Date();
const monthOfYear = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const month = monthOfYear[infoDate.getMonth()]
const year = infoDate.getFullYear()
console.log(month, year)

const API_KEY = 'f8b7220a-ec1b-477a-a473-19c5fd9c1329';
const API_URL_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`;
const API_URL_ANTICIPADET = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1';
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_URL_REALASES = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}`


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
        showMovies(respData);
    } catch (error) {
        console.error(error);
    }
}


function getClassByRate(rating) {
    if (rating >= 7) {
        return "green"
    } else if (rating > 5) {
        return "orange"
    } else if (rating < 5) {
        return "red"
    }

}

function showMovies(data) {
    moviesContent.innerHTML = ""

    if (data.releases) {
        data.releases.slice(0, 10).forEach(movie => {
            const movieElement = document.createElement("div");
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
                        <img id="favorite-btn"
                             src="image/heart__white.png"
                             alt="logo_favorite"
                        >
                    </div>
                </div>
            </div>
        `;

            moviesContent.appendChild(movieElement);
        });
    }
    if (data.films) {
        data.films.slice(0, 10).forEach(movie => {
            const movieElement = document.createElement("div");
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
                        
                        ${movie.rating !== undefined ? `
                              <div class="movie__average 
                              movie__average--${getClassByRate(movie.rating)}">
                                ${movie.rating}
                              </div>
                            ` : ''}
                   
                    </div>
                    <div class="movie_content-favorite">
                        <img id="favorite-btn"
                             src="image/heart__white.png"
                             alt="logo_favorite"
                        >
                    </div>
                </div>
            </div>
        `;

            moviesContent.appendChild(movieElement);
        });
    }
    if (data.items) {
        data.items.slice(0, 10).forEach(movie => {
            const movieElement = document.createElement("div");
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
                        
                        ${movie.rating !== undefined||null ? `
                              <div class="movie__average 
                              movie__average--${getClassByRate(movie.rating)}">
                                ${movie.rating}
                              </div>
                            ` : ''}
                   
                    </div>
                    <div class="movie_content-favorite">
                        <img id="favorite-btn"
                             src="image/heart__white.png"
                             alt="logo_favorite"
                        >
                    </div>
                </div>
            </div>
        `;

            moviesContent.appendChild(movieElement);
        });
    }

}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const apiSearchUrl = `${API_URL_SEARCH}${searchInput.value}`

    if (searchInput.value) {
        getMovies(apiSearchUrl)
        searchInput.value = ""
    }
    return getMovies(apiSearchUrl)
})


premiereMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const premiereMovies = `${API_URL_PREMIERES}`

    return getMovies(premiereMovies)

})
anticipatedMoviesBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const anticipatedMovies = `${API_URL_ANTICIPADET}`
    return getMovies(anticipatedMovies)
})

realesesMonthMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const realesesMonthMovies = `${API_URL_REALASES}`

    return getMovies(realesesMonthMovies)

})

popularMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const popularMovies = `${API_URL_POPULAR}`
    return getMovies(popularMovies)
})




