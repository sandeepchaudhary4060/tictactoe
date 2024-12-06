let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let player1 = "";
let player2 = "";
let player1Marker = "X";
let player2Marker = "O";
let player1Score = 0;
let player2Score = 0;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const scoreboardElement = document.getElementById("scoreboard");
const gameElement = document.getElementById("game");
const chooseMarkerElement = document.getElementById("chooseMarker");

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleCellClick);
        boardElement.appendChild(cellElement);
    });
}

function startGame() {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";

    if (!player1 || !player2) {
        alert("Please enter names for both players!");
        return;
    }

    document.querySelector(".names").style.display = "none";
    document.querySelector(".controls").style.display = "none";
    gameElement.style.display = "block";

    updateScoreboard();
}

function setMarker(marker) {
    player1Marker = marker;
    player2Marker = marker === "X" ? "O" : "X";

    currentPlayer = player1;
    chooseMarkerElement.style.display = "none";
    statusElement.textContent = `${player1}'s Turn (${player1Marker})`;

    createBoard();
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer === player1 ? player1Marker : player2Marker;
    event.target.textContent = board[index];

    if (checkWinner()) {
        statusElement.textContent = `${currentPlayer} Wins!`;
        gameActive = false;

        if (currentPlayer === player1) {
            player1Score++;
        } else {
            player2Score++;
        }

        updateScoreboard();
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusElement.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    statusElement.textContent = `${currentPlayer}'s Turn (${
        currentPlayer === player1 ? player1Marker : player2Marker
    })`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],            // Diagonals
    ];
    return winningCombinations.some(combination =>
        combination.every(index =>
            board[index] === (currentPlayer === player1 ? player1Marker : player2Marker)
        )
    );
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = player1;
    statusElement.textContent = `${currentPlayer}'s Turn (${currentPlayer === player1 ? player1Marker : player2Marker})`;
    createBoard();
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    player1Score = 0;
    player2Score = 0;

    updateScoreboard();
    statusElement.textContent = "";
    createBoard();
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    player1Score = 0;
    player2Score = 0;
    player1 = "";
    player2 = "";
    player1Marker = "X";
    player2Marker = "O";

    document.querySelector(".names").style.display = "block";
    document.querySelector(".controls").style.display = "block";
    gameElement.style.display = "none";
}
function updateScoreboard() {
    scoreboardElement.textContent = `${player1}: ${player1Score} | ${player2}: ${player2Score}`;
}
