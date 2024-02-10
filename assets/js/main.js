const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
let maxRecord = 151
let limit = 20
let offset = 0

function loadPokemonItems(offset, limit){
    function convertPokemonToHtml(pokemon){
        console.log(pokemon.photo)
        return `
                    <li class="liItemPokemon">
                    <div class="pokemonContentFrame ${pokemon.type}">
                        <div class="pokemonContent">
                            <span class="pokemonNumber">#${pokemon.id}</span>
                            <span class="pokemonName">${pokemon.name}</span>
                            <div class="pokemonDetail">
                                <ol class="pokemonTypes">
                                    ${pokemon.types.map((type) => `
                                    <li class="pokemonType ${type}">
                                    <img class="typeIcon" src="./assets/img/icons/${type}.svg" alt="">
                                    ${type}
                                    </li>
                                    `).join('')}
                                </ol>
                            </div>
                        </div>
                        <div class="pokemonImage">
                            <img src="${pokemon.photo}" alt="Pokémon ${pokemon.name}">
                        </div>
                    </div>
                </li>`
        
        
        
        
        
        /* `
                <div class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.id}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
        ` */
    }
    pokeApi.GetPokemons(offset, limit).then((pokemons = [])=>{
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join("")
    })
}

loadPokemonItems(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qntLimit = offset + limit
    if(qntLimit >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        console.log("Removed")
    }else{
        loadPokemonItems(offset, limit)
    }
})