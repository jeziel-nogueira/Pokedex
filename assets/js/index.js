const input = document.querySelector(".input")
const btnSearch = document.querySelector(".btnSearch")

function loadPokemonList(){
    window.location.href = "./assets/html/pokemonList.html"
}

btnSearch.addEventListener('click', function (){
    var inputValue = document.getElementById("inputField").value;
    
    if(inputValue != ''){
        console.log(inputValue)
    }else{
        console.log("vazio")
    }
})
