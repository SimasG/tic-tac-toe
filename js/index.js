// HOMEPAGE
const x = document.querySelector(".picker-x");
const circle = document.querySelector(".picker-zero");
const xIcon = document.querySelector(".x-icon");
const circleIcon = document.querySelector(".zero-icon");
const btnCPU = document.querySelector(".cpu");
const body = document.querySelector("body");
const homepage = document.querySelector("main");
const gameHeader = document.querySelector("header");
const gameContainer = document.querySelector(".game-container");

btnCPU.addEventListener("click", () => {
  body.classList.add("show");
  homepage.classList.add("hide");
  gameHeader.classList.add("show");
  gameContainer.classList.add("show");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    body.classList.remove("show");
    homepage.classList.remove("hide");
    gameHeader.classList.remove("show");
    gameContainer.classList.remove("show");
    x.classList.remove("active");
    xIcon.classList.remove("active");
    circle.classList.add("active");
    circleIcon.classList.add("active");
    winCounter = 0;
    wins.innerHTML = winCounter;
    tieCounter = 0;
    ties.innerHTML = tieCounter;
    lossCounter = 0;
    losses.innerHTML = lossCounter;
    startGame();
  }
});

let player1 = "circle";
let player2CPU = "x";
// const huPlayer = "O";
// const aiPlayer = "X";

// if true -> o's turn, if false -> x's turn. "let circleTurn" means "circleTurn" is undefined by default.
let circleTurn;

x.addEventListener("click", () => {
  x.classList.add("active");
  xIcon.classList.add("active");
  circle.classList.remove("active");
  circleIcon.classList.remove("active");
  player1 = "x";
  player2CPU = "circle";
  console.log(`player1 is ${player1}`);
  console.log(`player2CPU is ${player2CPU}`);
  // circleTurn = false;
});

circle.addEventListener("click", () => {
  x.classList.remove("active");
  xIcon.classList.remove("active");
  circle.classList.add("active");
  circleIcon.classList.add("active");
  player1 = "circle";
  player2CPU = "x";
  console.log(`player1 is ${player1}`);
  console.log(`player2CPU is ${player2CPU}`);
  // circleTurn = true;
});

// GAME
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
const winningMessageElement = document.querySelector(".game-over-container");
const restartElement = document.querySelector(".restart-container");
const winningMessageTextElement = document.querySelector(".modal-heading");
const restartTextElement = document.querySelector(".restart-heading");
const winningMessageIcon = document.querySelector(".winning-message-icon");
const btnQuit = document.querySelector(".btn-quit");
const btnNextRound = document.querySelector(".btn-next-round");
const btnRestart = document.querySelector(".btn-restart");
const btnCancel = document.querySelector(".btn-cancel");
const btnRestartModal = document.querySelector(".btn-restart-modal");
const wins = document.querySelector(".win-number");
const ties = document.querySelector(".tie-number");
const losses = document.querySelector(".loss-number");
const turnIcon = document.querySelector("[data-turn-icon]");

let winCounter = 0;
let tieCounter = 0;
let lossCounter = 0;

// let available = [];

startGame();

function startGame() {
  // circleTurn = false;
  cellElements.forEach((cellElement) => {
    cellElement.classList.remove(x_class);
    cellElement.classList.remove(circle_class);
    cellElement.removeEventListener("click", handleClick);
    cellElement.addEventListener("click", handleClick, { once: true });
    // cellElement.addEventListener("click", turnClick, { once: true });

    // available.push(cellElement);
  });
  winningMessageElement.classList.remove("show");
  restartElement.classList.remove("show");
  turnIcon.classList.remove("circle-silver");
  turnIcon.classList.add("x-silver");
  setHoverBoardClass();
}

// function turnClick(cell) {
//   if (
//     // !cell.classList.contains(x_class) &&
//     // !cell.classList.contains(circle_class)
//   ) {
//     if (!isDraw()) {
//       handleClick(e, markFirstSpot(), aiPlayer);
//     }
//   }
// }

// function showEmptySquares() {
//   return [...cellElements].filter(
//     (cell) =>
//       // !cell.classList.contains(x_class) &&
//       // !cell.classList.contains(circle_class)
//   );
// }

// function markFirstSpot() {
//   console.log(showEmptySquares().length);
//   console.log(showEmptySquares()[0]);
//   return showEmptySquares()[0];
// }

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
    // showEmptySquares();
    // markFirstSpot();
  }

  turnIcon.classList.toggle("circle-silver");
  turnIcon.classList.toggle("x-silver");
}

// If "isDraw()" runs, then endGame() argument becomes "true". Here, we name it "draw".
function endGame(draw) {
  winningMessageIcon.classList.remove(circle_class);
  winningMessageTextElement.classList.remove(circle_class);
  winningMessageIcon.classList.remove(x_class);
  winningMessageTextElement.classList.remove(x_class);
  if (draw) {
    console.log(draw);
    winningMessageTextElement.innerText = `ROUND TIED`;
    winningMessageTextElement.style.color = "#a8bfc9";
    tieCounter++;
    ties.innerHTML = tieCounter;
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
btnNextRound.addEventListener("click", startGame);

// event listener + function for "restart"
btnRestart.addEventListener("click", () => {
  restartElement.classList.add("show");
});

btnCancel.addEventListener("click", () => {
  restartElement.classList.remove("show");
});

btnRestartModal.addEventListener("click", startGame);

// Initial turn choosing

// Implement automatic CPU moves
// Implement more intelligent CPU logic?
// Implement multiplayer mode?
