// HOMEPAGE
const x = document.querySelector(".picker-x");
const zero = document.querySelector(".picker-zero");
const xIcon = document.querySelector(".x-icon");
const zeroIcon = document.querySelector(".zero-icon");

let player1 = "circle";
let player2 = "x";

x.addEventListener("click", () => {
  x.classList.add("active");
  xIcon.classList.add("active");
  zero.classList.remove("active");
  zeroIcon.classList.remove("active");
  player1 = "x";
  player2 = "circle";
});

zero.addEventListener("click", () => {
  x.classList.remove("active");
  xIcon.classList.remove("active");
  zero.classList.add("active");
  zeroIcon.classList.add("active");
  player1 = "circle";
  player2 = "x";
});
