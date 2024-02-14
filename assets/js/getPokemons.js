const getPoke = {}
const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
const pageTitle = document.getElementById("pageTitle")


let maxRecord = 151
let limit = 20
let offset = 0
let title = "Kanto"

var userData = JSON.parse( localStorage.getItem('userData') );
if(userData === null){
    console.log("NULLLL")
}else{
    if(userData.type == null){
        maxRecord = parseInt(userData.maxRecord)
        limit = parseInt(userData.limit)
        offset = parseInt(userData.offset)
        title = userData.title
        loadPokemonItems(offset, limit)
    }else{
        title = userData.title
        loadType(userData.type) 
    }
}



function convertPokemonToHtml(pokemon){
    pageTitle.innerHTML = `<h2 id="pageTitle">${title}</h2>`
    if(!pokemon.is_default){
        console.log(pokemon.name)
    }
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

function loadPokemonItems(offset, limit){
    
    pokeApi.GetPokemons(offset, limit, title).then((pokemons = [])=>{
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join("")
        
    })
}


/* carregar pokemons por temporada usando paginaçao */

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qntLimit = offset + limit
    if(qntLimit >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItems(offset, limit)
    }
})


/* carregar pokemons por tipo */
function loadType(type) {
    if (pokeApi && typeof pokeApi.GetPokemonsByType === 'function') {
        pokeApi.GetPokemonsByType(type)
            .then((pokemons = []) => {
                console.log("OPA")
                pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join("");
            })
            .then((opa) => console.log(opa))
            .catch(error => {
                console.error("Error fetching pokemons by type:", error);
            });
    } else {
        console.error("pokeApi or GetPokemonsByType is not defined or is not a function");
    }
}