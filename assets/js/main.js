const btnScrollTop = document.querySelector(".scrollTop")

window.addEventListener('scroll', function(){
    let scroll = this.document.querySelector(".scrollTop")
    scroll.classList.toggle('active', this.window.scrollY > 450)
})
btnScrollTop.addEventListener('click', function (){
    console.log("top")
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})