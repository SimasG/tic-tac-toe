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
const restartElement = document.querySelector(".restart-container");
const winningMessageTextElement = document.querySelector(".modal-heading");
const restartTextElement = document.querySelector(".restart-heading");
const winningMessageIcon = document.querySelector(".winning-message-icon");
const btnQuit = document.querySelector(".btn-quit");
const btnNextRound = document.querySelector(".btn-next-round");
const btnRestart = document.querySelector(".btn-restart");
const btnCancel = document.querySelector(".btn-cancel");
const btnRestartModal = document.querySelector(".btn-restart-modal");

// const squareIcons = document.querySelectorAll(".square-icon");

// if true -> o's turn, if false -> x's turn. "let circleTurn" means "circleTurn" is undefined by default.
let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach((cellElement) => {
    cellElement.classList.remove(x_class);
    cellElement.classList.remove(circle_class);
    cellElement.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
  restartElement.classList.remove("show");
  setHoverBoardClass();
}

function handleClick(e) {
  cell = e.target;
  // If circleTurn = true, currentClass = circle_class. Else currentClass = x_class.
  // Since circleTurn is "undefined", currentClass is always "x_class".
  const currentClass = circleTurn ? circle_class : x_class;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setHoverBoardClass();
  }
}

// If "isDraw()" runs, then endGame() argument becomes "true". Here, we name it "draw".
function endGame(draw) {
  winningMessageIcon.classList.remove(circle_class);
  winningMessageTextElement.classList.remove(circle_class);
  winningMessageIcon.classList.remove(x_class);
  winningMessageTextElement.classList.remove(x_class);
  if (draw) {
    winningMessageTextElement.innerText = `ROUND TIED`;
    winningMessageTextElement.style.color = "#a8bfc9";
  } else {
    if (circleTurn) {
      winningMessageIcon.classList.add(circle_class);
      winningMessageTextElement.classList.add(circle_class);
    } else {
      winningMessageIcon.classList.add(x_class);
      winningMessageTextElement.classList.add(x_class);
    }
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  // destructuring "cellElements" into an array. Otherwise, the "every" method wouldn't work here.
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setHoverBoardClass() {
  mainGrid.classList.remove(circle_class);
  mainGrid.classList.remove(x_class);
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

// event listener + function for "next round" + score keeping

// event listener + function for "quit"

// event listener + function for "restart"
btnRestart.addEventListener("click", restartGame);

function restartGame() {
  winningMessageIcon.classList.remove(circle_class);
  winningMessageTextElement.classList.remove(circle_class);
  winningMessageIcon.classList.remove(x_class);
  winningMessageTextElement.classList.remove(x_class);

  restartElement.classList.add("show");
}

btnCancel.addEventListener("click", () => {
  restartElement.classList.remove("show");
});

btnRestartModal.addEventListener("click", startGame);

// function quitGame() {
//   cellElements.forEach((cell) => {
//     cell.classList.remove(x_class);
//     cell.classList.remove(circle_class);
//   });
//   winningMessageElement.classList.remove("show");
//   circleTurn = false;
// }

// Initial turn choosing
// Implement automatic CPU moves
// Implement more intelligent CPU logic?
// Implement multiplayer mode?
