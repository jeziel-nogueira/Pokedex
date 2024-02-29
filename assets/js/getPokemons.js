const getPoke = {}
const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMore')
const pageTitle = document.getElementById("pageTitle")


let maxRecord = 151
let limit = 20
let offset = 0
let title = "Kanto"

var userData = JSON.parse( localStorage.getItem('userDataList') );
if(userData === null){
    window.location.href = "/index.html"
}else if(userData.title != null){
        if(pokeApi.types.includes(userData.title.toLowerCase())){
            console.log('Aqui')
            loadMoreButton.parentElement.removeChild(loadMoreButton)
            title = userData.title
            loadType(userData.title.toLowerCase())
        }else{
            maxRecord = parseInt(userData.maxRecord)
            limit = parseInt(userData.limit)
            offset = parseInt(userData.offset)
            title = userData.title
            loadPokemonItems(offset, limit)
        }
    }else{
        window.location.href = "/index.html"
    }



function convertPokemonToHtml(pokemon){
    pageTitle.innerHTML = `<h2>${title}</h2>`
    if(!pokemon.is_default){
        console.log(pokemon.name, '!is_default')
    }
    return `
                <li class="liItemPokemon">
                <div class="pokemonContentFrame ${pokemon.type}" onclick="loadPokeDetail(${pokemon.id})">
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

function loadPokeDetail(id){
    userData = { "id": id}
    localStorage.setItem("userDataId", JSON.stringify(userData))
    window.location.href = "./pokemonDetail.html"
}