const pokeApi = {}

function convertPokeApiToPokeModel(pokeDetail){

    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types[0]
    pokemon.is_default = pokeDetail.is_default
    if(pokeDetail.sprites.other.home.front_default === null){
        pokemon.photo = pokeDetail.sprites.front_default
    }else{
        pokemon.photo = pokeDetail.sprites.other.home.front_default
    }
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

//==================================
// carregar de talhes de um unico pokemon

function getPokemonSpecies(url){
   return fetch(url)
        .then((response) => response.json())
        .then((species) => console.log(species))
}

async function convertSinglePokeApiToPokeModel(pokeDetail){
    const pokemon = new Pokemon()

    const detailSpecies = await fetch(pokeDetail.species.url)
    const pokeSpecies = await detailSpecies.json()
    const detailEvolution = await fetch(pokeSpecies.evolution_chain.url)
    const pokeEvolutions = await detailEvolution.json()

    console.log(pokeDetail)
    console.log(pokeEvolutions)
    console.log(pokeSpecies)

    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.species.name
    pokemon.species = pokeDetail.species.name
    pokemon.is_default = pokeDetail.is_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types[0]

    //.push(pokeSpecies.evolves_from_species.name)
    try {
        pokemon.evolveFrom = pokeSpecies.evolves_from_species.name
    } catch (error) {
        pokemon.evolveFrom = null
    }

    pokemon.stats = pokeDetail.stats.map((typeSlot = []) => typeSlot)

    /* get Pokemon sprite/photo */
    if(pokeDetail.sprites.other.home.front_default === null){
        pokemon.photo = pokeDetail.sprites.front_default
    }else{
        pokemon.photo = pokeDetail.sprites.other.home.front_default
    }

    if(pokeSpecies.habitat != null){
        pokemon.habitat = pokeSpecies.habitat.name                
    }else{
        pokemon.habitat = null
    }
    pokemon.captureRate = pokeSpecies.capture_rate
    pokeSpecies.egg_groups.forEach(key => {
        pokemon.groups.push(key.name)
    });

    let maxflavors = 0
    flavors = []
    pokeSpecies.flavor_text_entries.forEach(desc => {
        if(desc.language.name == 'en'){
            maxflavors = maxflavors + 1
            flavors.push(desc.flavor_text)
        }
    });
    min = Math.ceil(0);
    max = Math.floor(maxflavors);
    valflavors = Math.floor(Math.random() * (max - min + 1)) + min;
    const textDesc = flavors[valflavors]
    pokemon.description = textDesc
    
    evolve(pokeEvolutions.chain)
    function evolve(chain){
        if(chain.species.name === pokemon.name){
            console.log(chain.species)
            if(chain.evolves_to.length > 0){
                chain.evolves_to.forEach(element => {
                    pokemon.evolveTo.push(element.species.name)
                });
            }else{
                pokemon.evolveTo[0] = '?'
            }
            return
        }
        chain.evolves_to.forEach(element => {
            evolve(element)
        });

        if(pokemon.evolveTo.length == 0){
            pokemon.evolveTo[0] = '?'
        }
    }

    return pokemon
    
}

pokeApi.loadSinglePokemonDetail = (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(url)
            .then((response) => response.json())
            .then(convertSinglePokeApiToPokeModel)
}

pokeApi.types = ["normal","grass","fire","water","electric","ice","ground","flying","poison","fighting","psychic","dark","rock","bug","ghost","steel","dragon","fairy"]