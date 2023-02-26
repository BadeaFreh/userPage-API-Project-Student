
const RANDOM_USERS_API = "https://randomuser.me/api?results=7"
const KANYE_QUOTES_API = "https://api.kanye.rest/"
const POKI_API = "https://pokeapi.co/api/v2/pokemon/"
const BACON_IPSUM_API = "https://baconipsum.com/api/?type=$"
const MAIN_USER_INDEX = 0

class APIManager {

  constructor () {
    this.data = {}
  }

  _getUsersData (allUsersData) {
    let relevantUsersData = []
    
    for (let i = 1; i < allUsersData.length; i++) {
      relevantUsersData[i] = {
        firstName: allUsersData[i].name.first,
        lastName: allUsersData[i].name.last,
      }
    }

    relevantUsersData[MAIN_USER_INDEX] = {
      firstName: allUsersData[MAIN_USER_INDEX].name.first,
      lastName: allUsersData[MAIN_USER_INDEX].name.last,
      picture: allUsersData[MAIN_USER_INDEX].picture.medium,
      city: allUsersData[MAIN_USER_INDEX].location.city,
      state: allUsersData[MAIN_USER_INDEX].location.state,
    }
    return relevantUsersData
  }

  _getRandomUsers() {
    return $.get(RANDOM_USERS_API)
            .then(usersResponse => {
              let allUsersData = usersResponse.results
              let usersData = this._getUsersData(allUsersData)
              this.data.usersData = usersData
              return usersData
            })
  }

  _geKanyetRandomQuote() {
    return $.get(KANYE_QUOTES_API)
            .then(kanyeQuoteResponse => {
              let kanyeQuote = kanyeQuoteResponse.quote
              this.data.kanyeQuote = kanyeQuote
              return kanyeQuote
            })
  }

  _getRandomPokemon() {
    return $.get(POKI_API)
            .then((pokemonsResponse) => {
              let randomIndex = Math.floor(Math.random() * pokemonsResponse.results.length)
              let randomPokemonURL = pokemonsResponse.results[randomIndex].url
              return $.get(randomPokemonURL)
            })
            .then((pokemonResponse) => {
              let pokemonData = {
                name: pokemonResponse.name,
                image: pokemonResponse.sprites.other.dream_world.front_default,
              }
              this.data.pokemonData = pokemonData
              return pokemonData
            })
  }

  _getMeatRandomText () {
    return $.get(BACON_IPSUM_API)
            .then((randomTextResponse) => {
              this.data.meatRandomText = randomTextResponse[0]
              return randomTextResponse[0]
            })
  }

  loadData () {
    renderer.emptyDataElements()
    let randomUsers = this._getRandomUsers()
    let randomKanyeQuote = this._geKanyetRandomQuote()
    let randomPokemon = this._getRandomPokemon()
    let meatRandomText = this._getMeatRandomText()
    return Promise.all([randomUsers, randomKanyeQuote, randomPokemon, meatRandomText])
  }

}
