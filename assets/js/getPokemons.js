const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
let maxRecord = 151
let limit = 20
let offset = 0

function loadPokemonItems(offset, limit){
    function convertPokemonToHtml(pokemon){
        return `
                    <li class="liItemPokemon">
                    <div class="pokemonContentFrame ${pokemon.type}" onclick="minhaFuncao(${pokemon.id})">
                        <div class="pokemonContent">
                            <span class="pokemonNumber">#${pokemon.id}</span>
                            <span class="pokemonName">${pokemon.name}</span>
                            <div class="pokemonDetail">
                                <ol class="pokemonTypes">
                                    ${pokemon.types.map((type) => `
                                    <li class="pokemonType ${type}">
                                    <img class="typeIcon" src="../img/icons/${type}.svg" alt="">
                                    ${type}
                                    </li>
                                    `).join('')}
                                </ol>
                            </div>
                        </div>
                        <div class="pokemonImage">
                            <img id="imgPoke" src="${pokemon.photo}" alt="Pokémon ${pokemon.name}">
                            <img id="imgReflect" src="${pokemon.photo}" alt="Pokémon ${pokemon.name}">
                        </div>
                    </div>
                </li>`
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

function minhaFuncao(valor) {
    console.log("O valor é: " + valor);
}