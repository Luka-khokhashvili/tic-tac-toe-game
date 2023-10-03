// App.js script file for tic-tac-toe game built by luka khokhashvili
/* -----------------------------
    ====== Content Table ======
    1. constants
    2. createBoard function
    3. addGo function
    4. checkScore function
    5. setBorder function
    6. restart function
-------------------------------- */

// 1. Constants
const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const startCells = [
    "", "", "", "", "", "", "", "", ""
];
let go = "cross";
infoDisplay.textContent = "Cross goes first";
let gameOver = false;

// 2. Function that creates tic tac toe board
function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    })
}

// CreateBoard and setBorder function calls
createBoard();
setBorder();

// 3. Function to handle adding "Cross" or "Circle" to squares
function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross"  : "circle";
    infoDisplay.textContent = "It is now " + go + "'s go";
    e.target.removeEventListener('click', addGo);
    checkScore();
}

// 4. Function to check and handle win or draw situations
function checkScore() {
    const restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', restart);
    const allSquares = document.querySelectorAll('.square');
    
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    
    let draw = true;

    // if circle wins
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'));
        

        if(circleWins) {
            infoDisplay.textContent = "Circle Wins!";
            array.forEach(cell => {
                allSquares[cell].style.backgroundColor = 'green';
            });
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            gameOver = true;
            restartButton.style.display = 'block'; // Show the restart button
            draw = false;
            return;
        }
    })

    // if cross wins
    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'));
        
        if(crossWins) {
            infoDisplay.textContent = "Cross Wins!";
            array.forEach(cell => {
                allSquares[cell].style.backgroundColor = 'Green';
            });
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            gameOver = true;
            restartButton.style.display = 'block'; // Show the restart button
            draw = false;
            return;
        }
    })

    // if it is a draw
    if (draw) {
        const isBoardFull = Array.from(allSquares).every(square =>
            square.firstChild?.classList.contains('circle') || square.firstChild?.classList.contains('cross'));

        if (isBoardFull) {
            infoDisplay.textContent = "It's a Draw!";
            gameOver = true;
            restartButton.style.display = 'block'; // Show the restart button
        }
    }
}

// 5. function to set borders for squares in every corner of the board
function setBorder() {
    const square0 = document.getElementById('0');
    const square2 = document.getElementById('2');
    const square6 = document.getElementById('6');
    const square8 = document.getElementById('8');
    
    // Set border radius for specific squares
    square0.style.borderTopLeftRadius = '10px';
    square2.style.borderTopRightRadius = '10px';
    square6.style.borderBottomLeftRadius = '10px';
    square8.style.borderBottomRightRadius = '10px';
}

// 6. function to reload page if user clicks "play again?" button
function restart() {
    location.reload();
}
