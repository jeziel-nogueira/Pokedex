const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
let maxRecord = 151
let limit = 20
let offset = 0

function loadPokemonItems(offset, limit){
    function convertPokemonToHtml(pokemon){
        let img = "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/bug.svg"
        return `
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
        `
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