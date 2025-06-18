function goToURL(url) {
    window.location.href = url;
}

window.addEventListener("scroll", ()=>{
    const navbar = document.querySelector(".navbar");
    if (window.scrollY>100){
        navbar.classList.add("scrolled")
    }else{
        navbar.classList.remove("scrolled");
    }
});