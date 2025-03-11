const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = [];
let currentPlayer = "X"; // Jogador inicial
let boardState = ["", "", "", "", "", "", "", "", ""]; // Tabuleiro vazio
let gameMode = 'local'; // Modo de jogo padrão

function toggleLightMode() {
    const body = document.body;
    const checkbox = document.querySelector('.checkbox');

    // Alterna o modo claro
    body.classList.toggle('light', checkbox.checked);
    document.getElementById('board').classList.toggle('light', checkbox.checked);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.toggle('light', checkbox.checked));
}

window.onload = function () {
    createBoard();
    // Define o tema padrão como escuro
    document.body.classList.add('dark');
    document.getElementById('board').classList.add('dark');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.add('dark'));

    // Reseta o estado do checkbox
    const checkbox = document.querySelector('.checkbox');
    checkbox.checked = false;
};

// Função para verificar o vencedor
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            if (message) {
                message.innerText = `Jogador ${currentPlayer} venceu!`;
            }
            disableBoard();
            alert(`Jogador ${currentPlayer} venceu! Clique em "Reiniciar" para jogar novamente`);
            return true;
        }
    }

    if (!boardState.includes("")) {
        if (message) {
            message.innerText = "Empate!";
        }
        return true;
    }
    return false;
}

// Desabilita o tabuleiro após o fim do jogo
function disableBoard() {
    cells.forEach(cell => cell.classList.add("disabled"));
}

// Função para lidar com o clique do jogador
function handleClick(index) {
    if (boardState[index] === "") {
        boardState[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        cells[index].style.color = currentPlayer === "X" ? "red" : "blue"; // Define a cor do texto
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna entre X e O
            if (gameMode === 'computer' && currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

// Função para a jogada do computador
function computerMove() {
    disableBoard(); // Desabilita o tabuleiro durante a jogada do computador
    setTimeout(() => {
        let availableCells = boardState.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        if (availableCells.length > 0) {
            let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            boardState[randomIndex] = currentPlayer;
            cells[randomIndex].innerText = currentPlayer;
            cells[randomIndex].style.color = currentPlayer === "X" ? "red" : "blue"; // Define a cor do texto
            if (!checkWinner()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna entre X e O
                enableBoard(); // Habilita o tabuleiro após a jogada do computador
            }
        }
    }, 1000); // Delay de 1 segundo
}

// Função para habilitar o tabuleiro
function enableBoard() {
    cells.forEach(cell => cell.classList.remove("disabled"));
}

// Função para reiniciar o jogo
function recomeca() {
    board.innerHTML = "";
    boardState = ["", "", "", "", "", "", "", "", ""];
    if (message) {
        message.innerText = ""; // Limpa a mensagem
    }
    cells = [];
    currentPlayer = "X";
    createBoard();
}

// Função para criar o tabuleiro
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", () => handleClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Função para iniciar o jogo, recebendo o modo como parâmetro
function startGame(mode) {
    console.log(`Modo de jogo selecionado: ${mode}`);
    gameMode = mode;
    recomeca();  // Reinicia o jogo para o modo selecionado
    if (mode === 'computer') {
        console.log("Modo contra o computador iniciado!");
    }
}

// Adicionando os ouvintes de evento
document.getElementById('playLocal').addEventListener('click', () => startGame('local'));
document.getElementById('playComputer').addEventListener('click', () => startGame('computer'));

window.onload = function () {
    createBoard();
};