const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const startGameButton = document.querySelector('#start-game');
const gameStatus = document.querySelector('#game-status');
const turnIndicator = document.querySelector('.turn-indicator');

let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let currentPlayer = 1; // 1 = user (X), 2 = computer (O)
let winner = 0;
let counter = 0;

startGameButton.addEventListener('click', startGame);

function startGame() {
    resetBoard();
    gameStatus.textContent = '';
    turnIndicator.textContent = "X's Turn";
    currentPlayer = 1;
    winner = 0;
    counter = 0;
    gameBoard.classList.remove('win-x', 'win-o','tie');
}

function playGame(cellIndex) {
    if (winner === 0) {
        const row = Math.floor(cellIndex / 3);
        const col = cellIndex % 3;
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            cells[cellIndex].textContent = currentPlayer === 1 ? 'X' : 'O';
            cells[cellIndex].classList.add(currentPlayer === 1 ? 'x' : 'o');
            counter++;
            checkWinner();
            if (winner === 0) {
                currentPlayer = 3 - currentPlayer; // switch player
                turnIndicator.textContent = currentPlayer === 1 ? "X's Turn" : "O's Turn (Computer)";
                if (currentPlayer === 2) {
                    setTimeout(computerMove, 1000); // delay computer move by 1 second
                }
            }
        }
    }
}

function computerMove() {
    const emptyCells = getEmptyCells();
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cellIndex = randomCell[0] * 3 + randomCell[1];
    board[randomCell[0]][randomCell[1]] = 2;
    cells[cellIndex].textContent = 'O';
    cells[cellIndex].classList.add('o');
    counter++;
    checkWinner();
    currentPlayer = 1;
    turnIndicator.textContent = "X's Turn";
}

function getEmptyCells() {
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }
    return emptyCells;
}

function checkWinner() {
    // Check for row - column winning  
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== 0) {
            winner = board[i][0];
            return;
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== 0) {
            winner = board[0][i];
            return;
        }
    }
    // Check for diagonal winning
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) {
        winner = board[0][0];
        return;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
        winner = board[0][2];
        return;
    }
    // Check for draw 
    if (counter === 9) {
        winner = -1;
    }
    updateGameStatus();
}

function resetBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = 0;
            cells[i * 3 + j].textContent = '';
            cells[i * 3 + j].classList.remove('x', 'o');
            document.querySelector('.h1').style.color = "white";
        }
    }
}

function updateGameStatus() {
    if (winner === 1) {
        turnIndicator.textContent = '↓';
        gameStatus.textContent = 'Player X Wins!';
        gameBoard.classList.add('win-x'); // add red box shadow
        document.querySelector('.h1').style.color = "red";
    } else if (winner === 2) {
        turnIndicator.textContent = '↓';
        gameStatus.textContent = 'Computer O Wins!';
        gameBoard.classList.add('win-o'); // add blue box shadow
        document.querySelector('.h1').style.color = "blue";
    } else if (winner === -1) {
        turnIndicator.textContent = '↓';
        gameStatus.textContent = 'It\'s a tie!';
        gameBoard.classList.add('tie');
        document.querySelector('.h1').style.color = "green";
    }
}


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        playGame(index);
    });
});

setInterval(updateGameStatus, 2000);