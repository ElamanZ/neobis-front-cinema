const favoriteBtn = document.getElementById('favorite-btn')


// let isRed = false
// favoriteBtn.addEventListener('click', () => {
//     isRed = !isRed
//     if (isRed) {
//         favoriteBtn.src = "image/heart__red.png"
//     } else {
//         favoriteBtn.src = "image/heart__white.png"
//     }
//     console.log('click favorite')
// })
const moviesContent = document.getElementById('movies-content');
const form = document.querySelector("form");
const searchInput = document.querySelector(".header__input");

const API_KEY = 'f8b7220a-ec1b-477a-a473-19c5fd9c1329';
const API_URL_PREMIERES = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=NOVEMBER";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

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
    if (data.items){
        data.items.forEach(movie => {
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


        if (data.films) {
            data.films.forEach(movie => {
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




