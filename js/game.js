// GAME -> solo
const x_class = "x";
const circle_class = "circle";
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const mainGrid = document.getElementById("main-grid");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.querySelector(".modal-container");
const winningMessageTextElement = document.querySelector(".modal-heading");
const winningMessageIcon = document.querySelector(".winning-message-icon");
// const squareIcons = document.querySelectorAll(".square-icon");

// if true -> o's turn, if false -> x's turn. "let circleTurn" means "circleTurn" is undefined by default.
let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach((cellElement) => {
    cellElement.addEventListener("click", handleClick, { once: true });
  });
  setHoverBoardClass();
}

function handleClick(e) {
  cell = e.target;
  // If circleTurn = true, currentClass = circle_class. Else currentClass = x_class.
  // Since circleTurn is "undefined", currentClass is always "x_class".
  const currentClass = circleTurn ? circle_class : x_class;

  // PLACE MARK
  placeMark(cell, currentClass);

  // CHECK FOR WIN
  if (checkWin(currentClass)) {
    endGame(false);
  }
  // CHECK FOR DRAW
  // IF NO WIN/DRAW, SWITCH TURNS
  swapTurns();
  // SET HOVER STATES
  setHoverBoardClass();
}

function endGame(draw) {
  if (draw) {
  } else {
    if (circleTurn) {
      winningMessageIcon.classList.add(circle_class);
      winningMessageTextElement.classList.add(circle_class);
      winningMessageTextElement.innerText = `TAKES THE ROUND!`;
    } else {
      winningMessageIcon.classList.add(x_class);
      winningMessageTextElement.classList.add(x_class);
      winningMessageTextElement.innerText = `TAKES THE ROUND!`;
    }
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setHoverBoardClass() {
  if (circleTurn) {
    mainGrid.classList.add(circle_class);
    mainGrid.classList.remove(x_class);
  } else {
    mainGrid.classList.add(x_class);
    mainGrid.classList.remove(circle_class);
  }
}

function checkWin(currentClass) {
  // .some method returns a boolean value if at least one of the array elements (array in array) meet the criteria
  return winning_combinations.some((combination) => {
    // .every method returns "true" if all of the array (combination) elements meet the criteria. "false" otherwise
    return combination.every((index) => {
      // check if cell elements with the index numbers in each array contain the same class
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
