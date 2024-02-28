
const content = document.getElementById("content")

let id = 0
var userData = JSON.parse( localStorage.getItem('userDataId') );
if(userData === null){
    window.location.href = "/index.html"
}if(userData.id != null){
    id = userData.id
    loadPokemonById(id)
}else{
    window.location.href = "/index.html"
}

function pokeToHtml(pokemon){
    return `
    <div clas="pokeDetails">
        <div class="pokeImg" id="pokeImg">
            <div class="details">
                <div class="detail ${pokemon.type}">
                    <p class="pokeName">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
                    <p class="pokeId">#${pokemon.id}</p>
                    <div class="img">
                        <img class="pokeImgView" src="${pokemon.photo}" alt="aqui"></img>
                    </div>
                </div>
            <div>
        </div>
        <ol class="typeList">
                ${pokemon.types.map((type) => `
                <li class="pokemonType ${type}">
                <img class="typeIcon" src="../img/icons/${type}.svg" alt="">
                ${type}
                </li>
            `).join('')}
        </ol>
        <div class="pokeDesc">
            <p class="pokeDescText">${pokemon.description}</p>
        </div>
        </div>
        <div class="pokeStats">
            ${pokemon.stats.map((stat) => `
                <div class="pokeStat">
                    <p>${stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1) + ":"} &nbsp</p>
                    <p>${stat.base_stat}</p>
                </div>
            `).join('')}
            <div class="pokeStat">
                <p>Wight:&nbsp</p>
                <p>${pokemon.weight}</p>
            </div>
            <div class="pokeStat">
                <p>Height:&nbsp</p>
                <p>${pokemon.height}</p>
            </div>
        </div>
    </div>
    `
}


function loadPokemonById(id) {
    pokeApi.loadSinglePokemonDetail(id)
            .then((pokemon) => {
                 content.innerHTML =  pokeToHtml(pokemon)

                console.log(pokemon)
            })
}