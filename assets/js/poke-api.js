const pokeApi = {}

function convertPokeApiToPokeModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types[0]
    pokemon.photo = pokeDetail.sprites.other.home.front_default
    if (pokemon.name == 'kakuna'){
        console.log(pokemon.id)
    }
    return pokemon
}

pokeApi.GetPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response)=> response.json())
            .then(convertPokeApiToPokeModel)
}

pokeApi.GetPokemons = (offset = 0, limit = 20) => {
    url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonsList) => pokemonsList.map(pokeApi.GetPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}