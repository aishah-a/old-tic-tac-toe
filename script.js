"use strict"


// gameEnd var -> end game if true --> function which executes to check game end? before starting new turn

// end game message, ask user to restart ??

// iterate through array to make sure all vals are NOT zero
// if none are zero, check if there's no win - if none => draw


// TO DO
// gameEnd + reset defaults function to start new game OR just add button to reload page
// change win types to factory functions????
// remove console logs


// LOGIC FOR UI VER

// initialize gameboard
// const cellList = document.querySelectorAll(".cell");

const container = document.querySelector(".cell_container");
const text = document.createElement('div');
const cellArray = [];
let gameBoard = [ [], [], []];

const BoardCell = (value, marked, empty) => {
    value,
    marked,
    empty = true;
    return { value, empty }
};

// create board
const showPage = (() => {

    
    text.setAttribute("id", "prompt");
    text.innerText = 'Player One, please place your marker';
    board.insertBefore(text, container)
    
    // create array list of cell objects - see if can be merged with gameboard
    for (let i = 0; i < 9; i++) {
        let cell = BoardCell(i, true);
        cellArray.push(cell);
        const divCell = document.createElement("div");
        divCell.setAttribute("class", "cell");
        divCell.setAttribute("id", cellArray[i].value);
        container.appendChild(divCell);
    }
    console.log(cellArray);

    // add to board array  so can check wins
    function addToBoard(index, num) {
        gameBoard[index].push(cellArray[num])
    }

    // see if way to increment index in add to board and reduce number of loops
    for (let i = 0; i < 3; i++) {
        // for (let j = 0; j < i; j++){
        addToBoard(0, i)
        console.log(i);
    }

    for (let i = 3; i < 6; i++) {
        // for (let j = 0; j < i; j++){
        addToBoard(1, i)
        console.log(i);
    }

    for (let i = 6; i < 9; i++) {
        // for (let j = 0; j < i; j++){
        addToBoard(2, i)
        console.log(i);
    }

})();


const Player = (playerName, marker) => {
    playerName
    // add back in to show "it's Player XYZ turn"
        const playAMove = (cell) => {
            // play move function
            // change cell status to "filled"
            if (cellArray[cell.id].empty === true) {
                cell.innerText = `${activePlayer.marker}`;
                // delete console log later
                console.log(activePlayer.marker);

                cellArray[cell.id].empty = false;
                cellArray[cell.id].marked = activePlayer.marker;
                game.checkWinner();
                game.switchPlayer();
            } else alert('Please choose another spot!');     
        }; 
    return { playerName, marker, playAMove };
}

const createElements = (() => {

    const cellList = document.querySelectorAll(".cell");
   
    
    cellList.forEach((cell) => {
        cell.addEventListener("click", () => {
            activePlayer.playAMove(cell);
        })
    })

    return { cellList }
})();

const playerOne = Player('Player One', 'X');
const playerTwo = Player('Player Two', 'O');
const players = [ playerOne, playerTwo ];
let activePlayer = players[0];

const game = (() => {

    let winner;
    let gameEnd = false;


    function switchPlayer() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    text.innerText = activePlayer.playerName + '\'s turn'
    }

    // winning conditions
    function checkWinner() {

        let gameWin = false;
        let gameDraw = false;

        const CheckWin = (arr) => {
            const crossWin = arr => arr.every((obj) => {
                return obj.marked === 'X';
            });
            const noughtWin = arr => arr.every((obj) => {
                return obj.marked === 'O';
            });
            return { crossWin, noughtWin }
        }

        function noughtWinLoop(arr) {
            for (let i = 0; i < gameBoard.length; i++) {
                let result = CheckWin(arr[i]);
                result = result.crossWin(arr[i])
                if (result === true) {
                    gameWin = true;
                }
            }
        }

        function crossWinLoop(arr) {
            for (let i = 0; i < gameBoard.length; i++) {
                let result = CheckWin(arr[i]);
                result = result.noughtWin(arr[i])
                if (result === true) {
                    gameWin = true;
                }
            }
        }

        // diagonal
        (() => {
            if (gameBoard[1][1].empty === false) {
                if ((gameBoard[0][0].marked === gameBoard[1][1].marked) && (gameBoard[1][1].marked === gameBoard[2][2].marked)) {
                    console.log('diag win');
                    console.log(gameBoard);
                    gameWin = true;
                } else if ((gameBoard[2][0].marked === gameBoard[1][1].marked) && (gameBoard[1][1].marked === gameBoard[0][2].marked)) {
                    console.log('diag win');
                    gameWin = true;
                }
            }
        })();


        // vertical
        (() => {

            const col0 = []
            const col1 = []
            const col2 = []
            
            let cols = [col0, col1, col2];

            // create array for each gameboard column and push into array
            const createCol = (column, index)  => {
                // iterate through array with for loop
                for (let i = 0; i < gameBoard.length; i++) {
                    column.push(gameBoard[i][index]);
                }
            }

            // call function to push each column to col array
            for (let i = 0; i < 3; i++) {
                createCol(cols[i], [i]);
            }
            
            crossWinLoop(cols);
            noughtWinLoop(cols);
    
        })();

        
        // horizontal
        (() => {

            crossWinLoop(gameBoard);
            noughtWinLoop(gameBoard);

        })();


        // tie 
        const checkMarked = arr => arr.every((obj) => {
            return obj.empty === false;
        })

        let results = []
        for (let i = 0; i < 3; i++) {
            let result = checkMarked(gameBoard[i]);
            results.push(result);
        }

        const checkTrue = arr => arr.every((val) => {
            return val === true;
        })

        if (results.length === 3) {
            let answer = checkTrue(results);
            if (answer === true) {
                if (gameWin === false) {
                    gameDraw = true;
                }
            }
        }

        // declare winner

        /* 
        if marker = X -> P1 is winner
        if marker = O -> P2 is winner

        */

        const declareWinner = () => {
            activePlayer.marker === 'X' ? winner = playerOne : winner = playerTwo;
            console.log('The winner is: ' + winner.playerName);
            text.remove();
            const declare = document.createElement('div');
            declare.setAttribute('id', 'prompt');
            declare.innerText = winner.playerName + ' wins!'
            board.insertBefore(declare, container);

        }

        if (gameWin === true) {
            console.log('winner chosen');
            declareWinner();
            gameEnd = true;
        } else if (gameDraw === true) {
            console.log('it\'s a tie!');
            text.innerText = 'Tie!'
            gameEnd = true;
        }

        if (gameEnd === true) {
            console.log('done!');
        }
    }
    return { checkWinner, switchPlayer }
})();


function endGame() {
    
    // can't remove event listeners on finish so maybejust delete the board?
    // or place a message over the board so board can't be clicked lol

    // reload page
    location.reload();
};