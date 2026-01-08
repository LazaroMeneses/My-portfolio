const nav = document.querySelector("#nav");
const openList = document.querySelector("#open");
const closeList = document.querySelector("#close");

openList.addEventListener("click", () => {
    nav.classList.add("visible");
})

closeList.addEventListener("click", () => {
    nav.classList.remove("visible")
})