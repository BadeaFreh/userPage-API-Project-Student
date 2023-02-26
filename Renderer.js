
class Renderer {

    renderMainProfile (mainUser) {
        const source = $('#user-info').html()
        const template = Handlebars.compile(source)
        const newHTML = template({
            firstName: mainUser.firstName,
            lastName: mainUser.lastName,
            state: mainUser.state,
            city: mainUser.city,
            imageURL: mainUser.picture
        })
        $('.user-container').append(newHTML)
    }

    renderFriendsList (friends) {
        const source = $('#render-friends').html()
        const template = Handlebars.compile(source)
        for (let user of friends) {
            const newHTML = template({
                firstName: user.firstName,
                lastName: user.lastName
            })
            $('.friends-container').append(newHTML)
        }
    }

    renderFavoriteQuote (kanyeQuote) {
        const source = $('#favorite-quote').html()
        const template = Handlebars.compile(source)
        const newHTML = template({quote: kanyeQuote})
        $('.quote-container').append(newHTML)
    }

    renderPokemonInfo (pokemonData) {
        const source = $('#pokemon-info').html()
        const template = Handlebars.compile(source)
        const newHTML = template({
            pokemonName: pokemonData.name,
            pokemonImage: pokemonData.image
        })
        $('.pokemon-container').append(newHTML)
    }

    renderMeatRandomText (randomText) {
        const source = $('#about-me').html()
        const template = Handlebars.compile(source)
        const newHTML = template({
            meatRandomText: randomText
        })
        $('.meat-container').append(newHTML)
    }

    emptyDataElements () {
        $(".user-container").empty()
        $(".friends-container").empty()
        $(".quote-container").empty()
        $(".pokemon-container").empty()
        $(".meat-container").empty()
    }
}
