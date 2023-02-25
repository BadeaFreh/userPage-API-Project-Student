
class Renderer {
    
    contrcutor() {
        this.usersData = null
        this.kanyeQuote = null
        this.pokemonData = null
        this.randomText = null
    }

    renderMainProfile (mainUser) {
        let source = $('#user-info').html()
        let template = Handlebars.compile(source)
        let newHTML = template({
            firstName: mainUser.firstName,
            lastName: mainUser.lastName,
            state: mainUser.state,
            city: mainUser.city,
            imageURL: mainUser.picture
        })
        $('.user-container').append(newHTML)
    }

    renderFriendsList (friendsArray) {
        let source = $('#render-friends').html()
        let template = Handlebars.compile(source)
        for (let user of friendsArray) {
            let newHTML = template({
                firstName: user.firstName,
                lastName: user.lastName
            })
            $('.friends-container').append(newHTML)
        }
    }

    renderFavoriteQuote (kanyeQuote) {
        let source = $('#favorite-quote').html()
        let template = Handlebars.compile(source)
        let newHTML = template({quote: kanyeQuote})
        $('.quote-container').append(newHTML)
    }

    renderPokemonInfo (pokemonData) {
        let source = $('#pokemon-info').html()
        let template = Handlebars.compile(source)
        let newHTML = template({
            pokemonName: pokemonData.name,
            pokemonImage: pokemonData.image
        })
        $('.pokemon-container').append(newHTML)
    }

    renderMeatText (meatText) {
        let source = $('#about-me').html()
        let template = Handlebars.compile(source)
        let newHTML = template({
            randomText: meatText
        })
        $('.meat-container').append(newHTML)
    }

    renderAll (mainUser, friendsArray, kanyeQuote, pokemonData, meatText) {
        renderMainProfile(mainUser)
        renderFriendsList(friendsArray)
        renderFavoriteQuote (kanyeQuote)
        renderPokemonInfo (pokemonData)
        renderMeatText (meatText)
    }
}
