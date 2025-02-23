const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = [];
let currentPlayer = "X"; // Jogador inicial
let boardState = ["", "", "", "", "", "", "", "", ""]; // Tabuleiro vazio

// Função para alternar o modo escuro
function toggleDarkMode() {
    const body = document.body;
    const button = document.getElementById('toggleDarkMode');
    
    // Alterna o modo escuro
    body.classList.toggle('dark');
    document.getElementById('board').classList.toggle('dark');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.toggle('dark'));

    // Atualiza o texto do botão
    if (body.classList.contains('dark')) {
        button.innerText = "Modo claro"; // Quando estiver no modo escuro, o texto muda para "Modo claro"
    } else {
        button.innerText = "Modo escuro"; // Quando estiver no modo claro, o texto muda para "Modo escuro"
    }
}



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
            return;
        }
    }

    if (!boardState.includes("")) {
        if (message) {
            message.innerText = "Empate!";
        }
    }
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
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna entre X e O
    }
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
    if (mode === 'local') {
        // Lógica para iniciar o jogo local
        recomeca();  // Reinicia o jogo para o modo local
    } else if (mode === 'computer') {
        // Lógica para iniciar o jogo contra o computador
        recomeca();  // Reinicia o jogo para o modo contra o computador
        console.log("Modo contra o computador iniciado!");
    }
}

// Adicionando os ouvintes de evento
document.getElementById('playLocal').addEventListener('click', () => startGame('local'));
document.getElementById('playComputer').addEventListener('click', () => startGame('computer'));


window.onload = function() {
    createBoard(); 
};

