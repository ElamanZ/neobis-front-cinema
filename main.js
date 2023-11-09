const favoriteBtn = document.getElementById('favorite-btn')
let isRed = false
favoriteBtn.addEventListener('click', () => {
    isRed = !isRed
    if (isRed) {
        favoriteBtn.src = "image/heart__red.png"
    } else {
        favoriteBtn.src = "image/heart__white.png"
    }
    console.log('click')
})

const API_KEY = 'f8b7220a-ec1b-477a-a473-19c5fd9c1329'
const API_URL_PREMIERES = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=NOVEMBER"
