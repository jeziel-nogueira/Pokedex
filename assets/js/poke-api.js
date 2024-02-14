const pokeApi = {}

function convertPokeApiToPokeModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types[0]
    pokemon.photo = pokeDetail.sprites.other.home.front_default
    pokemon.is_default = pokeDetail.is_default
    return pokemon
}

pokeApi.GetPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response)=> response.json())
            .then(convertPokeApiToPokeModel)
}

pokeApi.GetPokemonDetailsType = (pokemon) => {
    return fetch(pokemon.pokemon.url)
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



pokeApi.GetPokemonsByType = (type) => {
    let url = `https://pokeapi.co/api/v2/type/${type}/`
    return fetch(url)
            .then((response) => response.json())
            .then((data) => data.pokemon)
            .then((pokemonsList) => pokemonsList.map(pokeApi.GetPokemonDetailsType))
            .then((pokemonsDetails) => Promise.all(pokemonsDetails))
}

pokeApi.loadSinglePokemonDetail = (url) => {
    async function load(){
        const response = await fetch(url);
        const poke = await response.json();
        return poke
        
    }
    //return load()
}

pokeApi.types = ["normal","grass","fire","water","electric","ice","ground","flying","poison","fighting","psychic","dark","rock","bug","ghost","steel","dragon","fairy"]