const input = document.querySelector(".input")
const btnSearch = document.querySelector(".btnSearch")
const listType = document.getElementById("listType")

var userData = { maxRecord: "151", limit: "20" , offset: "0"};




btnSearch.addEventListener('click', function (){
    var inputValue = document.getElementById("inputField");
    
    if(inputValue.value != ''){
        var url = `https://pokeapi.co/api/v2/pokemon/${inputValue.value.toLowerCase()}`
        fetch(url)
        .then((response) => response.json())
        .then((poke) => {
            id = poke.id
            userData = { "id": id}
            localStorage.setItem("userDataId", JSON.stringify(userData))
            window.location.href = "./assets/html/pokemonDetail.html"
        })
        .catch((error)=>{
            console.log(error)
            inputValue.value = ''
            return error
        })
    }else{
        console.log("vazio")
    }
})


function loadGeneraion(key, title){
    console.log(key)
    switch (key) {
        case 1:
            userData = { maxRecord: "151", limit: "20" , offset: "0", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 2:
            userData = { maxRecord: "251", limit: "20" , offset: "151", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 3:
            userData = { maxRecord: "386", limit: "20" , offset: "251", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 4:
            userData = { maxRecord: "493", limit: "20" , offset: "386", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 5:
            userData = { maxRecord: "649", limit: "20" , offset: "493", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 6:
            userData = { maxRecord: "721", limit: "20" , offset: "649", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 7:
            userData = { maxRecord: "809", limit: "20" , offset: "721", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 8:
            userData = { maxRecord: "905", limit: "20" , offset: "809", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        case 9:
            userData = { maxRecord: "1025", limit: "20" , offset: "905", "title": title}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
        default:
            userData = { maxRecord: "151", limit: "20" , offset: "0", "title": "Kanto"}
            localStorage.setItem("userDataList", JSON.stringify(userData))
            break;
    }
    window.location.href = "./assets/html/pokemonList.html"
}

function loadType(type){
    userData = { "type": type, title: type.charAt(0).toUpperCase() + type.slice(1)}
    localStorage.setItem("userDataList", JSON.stringify(userData))
    window.location.href = "./assets/html/pokemonList.html"
}

listType.innerHTML = ""
for (type in pokeApi.types) {
    
    
    const btn = `
    <li class="listContent">
        <button type="button" class="btnType ${pokeApi.types[type]}" onclick="loadType('${pokeApi.types[type]}')">
            <img class="typeIcon" src="./assets/img/icons/${pokeApi.types[type]}.svg" alt="">
            ${pokeApi.types[type].charAt(0).toUpperCase() + pokeApi.types[type].slice(1)}
        </button>
    </li>
    `
    listType.innerHTML += btn
}