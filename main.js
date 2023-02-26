
let renderer = new Renderer()
let apiManager = new APIManager()

const renderPage = function () {
    apiManager.loadData()
    .then((_) => {
        renderer.renderMainProfile(apiManager.data.usersData[MAIN_USER_INDEX])
        renderer.renderFriendsList(apiManager.data.usersData.slice(1))
        renderer.renderFavoriteQuote(apiManager.data.kanyeQuote)
        renderer.renderPokemonInfo(apiManager.data.pokemonData)
        renderer.renderMeatRandomText(apiManager.data.meatRandomText)
    })

}

renderPage()
$(".generate-user-btn").on("click", () => {
    renderPage()
})
