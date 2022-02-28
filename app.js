// HOMEPAGE
// const x = document.querySelector(".picker-x");
// const zero = document.querySelector(".picker-zero");
// const xIcon = document.querySelector(".x-icon");
// const zeroIcon = document.querySelector(".zero-icon");

// x.addEventListener("click", () => {
//   x.style.backgroundColor = "#a8bfc9";
//   xIcon.style.backgroundImage = "url('../assets/icon-x-transparent.svg')";
//   zero.style.backgroundColor = "#1a2a33";
//   zeroIcon.style.backgroundImage = "url('../assets/icon-o-silver.svg')";
// });

// zero.addEventListener("click", () => {
//   zero.style.backgroundColor = "#a8bfc9";
//   zeroIcon.style.backgroundImage = "url('../assets/icon-o-transparent.svg')";
//   x.style.backgroundColor = "#1a2a33";
//   xIcon.style.backgroundImage = "url('../assets/icon-x-silver.svg')";
// });

// GAME
const squares = document.querySelectorAll(".square");
const squareIcons = document.querySelectorAll(".square-icon");

squareIcons.forEach((squareIcon) => {
  squareIcon.addEventListener("click", () => {
    squareIcon.style.backgroundImage = "url('../assets/icon-x.svg')";
  });
});
