const btnScrollTop = document.querySelector(".scrollTop")
const btnGoHome = document.querySelector(".goHome")

window.addEventListener('scroll', function(){
    let scroll = this.document.querySelector(".scrollTop")
    scroll.classList.toggle('active', this.window.scrollY > 450)
})
btnScrollTop.addEventListener('click', function (){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

btnGoHome.addEventListener('click', function (){
    var caminhoDaPagina = window.location.pathname;

    if(caminhoDaPagina != '/index.html'){
        window.location.href = "/index.html"
    }else{    
        window.location.href = "../index.html"
        console.log("reload")
    }
})


/* 

listas
https://pokeapi.co/api/v2/
https://pokeapi.co/api/v2/pokedex/
https://pokeapi.co/api/v2/pokedex/1/
https://pokeapi.co/api/v2/generation/
https://pokeapi.co/api/v2/region/

*/