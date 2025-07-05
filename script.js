let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Human is X, AI is O
let gameOver = false;

function makeMove(index) {
  if (board[index] === "" && !gameOver && currentPlayer === "X") {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    if (checkWin("X")) {
      document.getElementById("status").innerText = "You Win!";
      gameOver = true;
      return;
    } else if (board.every(cell => cell !== "")) {
      document.getElementById("status").innerText = "It's a Draw!";
      gameOver = true;
      return;
    }

    currentPlayer = "O";
    document.getElementById("status").innerText = "AI's turn...";
    
    setTimeout(aiMove, 500); // Small delay for AI realism
  }
}

function aiMove() {
  if (gameOver) return;

  // Simple AI: Random empty cell selection
  let emptyCells = board
    .map((val, idx) => val === "" ? idx : null)
    .filter(idx => idx !== null);

  if (emptyCells.length === 0) return;

  let aiChoice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[aiChoice] = "O";
  document.getElementsByClassName("cell")[aiChoice].innerText = "O";

  if (checkWin("O")) {
    document.getElementById("status").innerText = "AI Wins!";
    gameOver = true;
    return;
  } else if (board.every(cell => cell !== "")) {
    document.getElementById("status").innerText = "It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = "X";
  document.getElementById("status").innerText = "Your turn (X)";
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => 
    pattern.every(i => board[i] === player)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
  document.getElementById("status").innerText = "Your turn (X)";
}