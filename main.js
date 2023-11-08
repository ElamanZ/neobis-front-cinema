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