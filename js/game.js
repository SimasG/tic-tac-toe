// GAME -> solo
const x_class = "x";
const circle_class = "circle";

const mainGrid = document.getElementById("main-grid");
const cellElements = document.querySelectorAll("[data-cell]");
const squareIcons = document.querySelectorAll(".square-icon");

// if true -> o's turn, if false -> x's turn. "let circleTurn" means "circleTurn" is undefined by default.
let circleTurn;

cellElements.forEach((cellElement) => {
  cellElement.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  cell = e.target;
  // If circleTurn = true, currentClass = circle_class. Else currentClass = x_class.
  // Since circleTurn is "undefined", currentClass is always "x_class".
  const currentClass = circleTurn ? circle_class : x_class;
  // PLACE MARK
  placeMark(cell, currentClass);
  // CHECK FOR WIN
  // CHECK FOR DRAW
  // IF NO WIN/DRAW, SWITCH TURNS
  swapTurns();

  // SET HOVER STATES
  setHoverBoardClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setHoverBoardClass() {
  if (circleTurn == true) {
    mainGrid.classList.add(circle_class);
    mainGrid.classList.remove(x_class);
  } else if (circleTurn == false) {
    mainGrid.classList.add(x_class);
    mainGrid.classList.remove(circle_class);
  }
}

// If x -> active, "x turn" & player 1 starts. If o -> active, "x turn" and CPU starts.
