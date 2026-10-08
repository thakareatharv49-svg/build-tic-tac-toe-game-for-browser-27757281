const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

const wins = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function winner() {
  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "draw" : null;
}

function render() {
  boardElement.innerHTML = "";
  board.forEach((value, index) => {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.textContent = value;
    cell.setAttribute("aria-label", "Cell " + (index + 1));
    cell.addEventListener("click", () => move(index));
    boardElement.appendChild(cell);
  });
}

function move(index) {
  if (gameOver || board[index]) return;
  board[index] = currentPlayer;
  const result = winner();
  if (result) {
    gameOver = true;
    statusElement.textContent = result === "draw" ? "It's a draw!" : "Player " + result + " wins!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = "Player " + currentPlayer + "'s turn";
  }
  render();
}

function restart() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  statusElement.textContent = "Player X's turn";
  render();
}

restartButton.addEventListener("click", restart);
render();
