const nav = document.querySelector(".elements");
const button = document.querySelector(".rows");
const spans = document.querySelectorAll(".span");

function toggler() {
	nav.classList.toggle("sidebar");
	spans[0].classList.toggle("line-0");
	spans[1].classList.toggle("line-1");
	spans[2].classList.toggle("line-2");
}

button.addEventListener("click", toggler);
