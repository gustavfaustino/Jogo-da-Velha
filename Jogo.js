const board = document.getElementById("board");
const mensagem =document.getElementById("mensagem");
let cells = [];
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            message.innerText = `Jogador ${currentPlayer} venceu!`;

            disableBoard();
            return;
        }
    }
    if (!boardState.includes("")) {
        message.innerText = "Empate!";
    }
}

function disableBoard() {
    cells.forEach(cell => cell.classList.add("disabled"));

}

function handleClick(Jogo) {
    if (boardState[Jogo] === "") {
        boardState[Jogo] = currentPlayer;
        cells[Jogo].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function recomeca() {
    board.innerHTML = "";
    boardState = ["", "", "", "", "", "", "", "", ""];
    message.innerText = "";
    cells = [];
    currentPlayer = "X";
    createBoard();
}

function createBoard() {
    for (let i = 0;  i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

window.onload = function() {
    createBoard();
}

console.log("Tabuleiro criado com sucesso!", cells);