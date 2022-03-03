// GAME -> solo
const cellElements = document.querySelectorAll("[data-cell]");
const squareIcons = document.querySelectorAll(".square-icon");

const x_class = "x";
const circle_class = "circle";

// if true -> o's turn, if false -> x's turn
let circleTurn;

squareIcons.forEach((squareIcon) => {
  squareIcon.addEventListener(
    "click",
    handleClick,
    { once: true }
    // {
    // squareIcon.style.backgroundImage = "url('../assets/icon-x.svg')";
    // }
  );
});

function handleClick(e) {
  cell = e.target;
  // If circleTurn = true, currentClass = circle_class. Else currentClass = x_class.
  const currentClass = circleTurn ? circle_class : x_class;
  // squareIcon.style.backgroundImage = "url('../assets/icon-x.svg')";
  // place mark
  placeMark(cell, currentClass);
  // check for win
  // check for draw
  // if no win/draw, switch turns
  console.log(cell);
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// If x -> active, "x turn" & player 1 starts. If o -> active, "x turn" and CPU starts.
