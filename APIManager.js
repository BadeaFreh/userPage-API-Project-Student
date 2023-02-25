
const RANDOM_USER_API = 'https://randomuser.me/api?results=7'
const KANYE_QUOTES_API = 'https://api.kanye.rest/'
const POKI_API = 'https://pokeapi.co/api/v2/pokemon/'
const POKEMON_DATA_URL = 'https://baconipsum.com/api/?type=$'
const MAIN_INDEX = 0

class APIManager {
    constructor() {
        this.data = {}
    }

    loadData () {
        $.get(RANDOM_USER_API)
            .then(usersResponse => {
                let usersArray = usersResponse.results
                let usersData = []
                for (let i = 1; i < usersArray.length; i++) {
                    let firstName = usersArray[i].name.first
                    let lastName = usersArray[i].name.last
                    usersData[i] = {
                        firstName,
                        lastName,
                    }
                }
                usersData[MAIN_INDEX] = {
                    firstName: usersArray[MAIN_INDEX].name.first,
                    lastName: usersArray[MAIN_INDEX].name.last,
                    picture: usersArray[MAIN_INDEX].picture.medium,
                    city: usersArray[MAIN_INDEX].location.city,
                    state: usersArray[MAIN_INDEX].location.state
                }
                this.data.usersData = usersData
                return $.get(KANYE_QUOTES_API)
            })
            .then(kanyeQuoteResponse => {
                let kanyeQuote = kanyeQuoteResponse.quote
                this.data.kanyeQuote = kanyeQuote
                return $.get(POKI_API)
            })
            .then(pokemonResponse => {
                let randomIndex = Math.floor(Math.random() * pokemonResponse.results.length)
                let pokemonURL = pokemonResponse.results[randomIndex].url
                return $.get(pokemonURL)
            })
            .then(pokemonResponse => {
                let pokemonData = {
                    name: pokemonResponse.name,
                    image: pokemonResponse.sprites.other.dream_world.front_default
                }
                this.data.pokemonData = pokemonData
                return $.get(POKEMON_DATA_URL + pokemonData.name)
            })
            .then(randomTextResponse => {
                this.data.meatText = randomTextResponse[0]

                renderer.renderMainProfile(this.data.usersData[MAIN_INDEX])
                renderer.renderFriendsList(this.data.usersData.slice(1))
                renderer.renderFavoriteQuote(this.data.kanyeQuote)
                renderer.renderPokemonInfo(this.data.pokemonData)
                renderer.renderMeatText(this.data.meatText)
            })
    }

    regenerateData () {
        $('.user-container').empty()
        $('.friends-container').empty()
        $('.quote-container').empty()
        $('.pokemon-container').empty()
        $('.meat-container').empty()
        this.loadData()
    }
}
