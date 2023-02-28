let renderer = new Renderer()
let apiManager = new APIManager()
let userID = 1
localStorage.setItem("savedUsers", JSON.stringify({}))
let isNewLoad = true

const renderData = function (mainUser, friends, kanyeQuote, pokemonData, meatRandomText) {
    renderer.emptyDataElements()
    renderer.renderMainProfile(mainUser)
    renderer.renderFriendsList(friends)
    renderer.renderFavoriteQuote(kanyeQuote)
    renderer.renderPokemonInfo(pokemonData)
    renderer.renderMeatRandomText(meatRandomText)
}

const requestNewData = function () {
    apiManager.loadData()
        .then((_) => {
            renderData(
                apiManager.data.usersData[MAIN_USER_INDEX],
                apiManager.data.usersData.slice(1),
                apiManager.data.kanyeQuote,
                apiManager.data.pokemonData,
                apiManager.data.meatRandomText
            )
        })
}
requestNewData()

$(".save-user-btn").on("click", () => {
    let storedData = JSON.parse(localStorage.getItem("savedUsers") || "{}")
    if (isNewLoad) {
        storedData[userID] = apiManager.data
        isNewLoad = false
        localStorage.setItem("savedUsers", JSON.stringify(storedData))
        $("#saved-users").append(`<option id="${userID++}">
                            ${apiManager.data.usersData[0].firstName} 
                            ${apiManager.data.usersData[0].lastName}
                            </option>`)
    }
})

$(".load-new-btn").on("click", () => {
    requestNewData()
    isNewLoad = true
})

$("#saved-users").change(() => {
    try {
        let selectedUserID = $("option:selected").attr('id')
        let selectedUserData = JSON.parse(localStorage.getItem("savedUsers") || "{}")[selectedUserID]
        renderData(
            selectedUserData.usersData[MAIN_USER_INDEX],
            selectedUserData.usersData.slice(1),
            selectedUserData.kanyeQuote,
            selectedUserData.pokemonData,
            selectedUserData.meatRandomText
        )
    } catch (err) {
        console.log("Invalid selection .. select again")
    }
})