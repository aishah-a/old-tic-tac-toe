"use strict"

const board = (() => {
    // OR return new Array(3).fill(0).map(() => new Array(3).fill(0));
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

})();

const game = (() => {

    let gameEnd = false;
    console.log(board);

    
    function Player(marker) {
        marker
        return { marker };
    }

    const playerOne = Player("X");
    const playerTwo = Player("O");

    const players = [ playerOne, playerTwo]

    let activePlayer = players[0];
    showActivePlayer();


    const switchPlayer = () => {
       activePlayer = activePlayer === players[0] ? players[1] : players[0];
       showActivePlayer();
       
    }
    
    function showActivePlayer() {
        activePlayer === players[0] ? console.log("Player One's turn.") : console.log("Player Two's turn.");
    }

    function playMove(row, column) {
        // check if chosen spot is empty
        if (board[row][column] !== 0) {
            console.log('Please choose another spot!')
        } else {
            board[row].splice(column, 1, activePlayer.marker);
            checkWinner();
            if (gameEnd !== true) {
                console.log(board);
                switchPlayer();
            }
        }
    }   

    // implement winning conditions
    // diagonal - if array[0][0] === array[1][1] === array[2][2]

    function checkWinner() {

        let gameWin = false;
        let gameDraw = false;
        // diagonal
        (() => {
            if (board[1][1] !== 0) {
                if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) {
                    console.log('diag win');
                    gameWin = true;

                } else if ((board[2][0] === board[1][1]) && (board[1][1] === board[0][2])) {
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
            
            const checkCol = (column, index)  => {
                // iterate through array with for loop
                for (let i = 0; i < board.length; i++) {
                    column.push(board[i][index]);
                }
            }

            checkCol(col0, 0);
            checkCol(col1, 1);
            checkCol(col2, 2);

            const allEqual = arr => arr.every(val => val === arr[0]);

            const resultCol0 = allEqual(col0);
            const resultCol1 = allEqual(col1);
            const resultCol2 = allEqual(col2);

            // ensure matching column values are not zero - if true, column matches
            const checkVal = (column, check) => {
                if ((check === true) && (column[1]) !== 0) {
                    check = true;
                } else check = false;
                return check;
            }
        
            const col0Match = checkVal(col0, resultCol0);
            const col1Match = checkVal(col1, resultCol1);
            const col2Match = checkVal(col2, resultCol2);

            if ((col0Match || col1Match || col2Match) === true) {
                console.log('vertical win!');
                gameWin = true;
            }
            return { col0Match, col1Match, col2Match };
            
        })();

        // horizontal
        // change to use 'every'??
        (() => {
            board.forEach(element => {
                if ((element[0] === element[1] && element[1] === element[2]) && element[0] !== 0) { 
                    // gameEnd = true - if false, stop game
                    // if element[1] = X > winner is P1, else P2
                    console.log('horizontal win!');
                    gameWin = true;
                }
            });
        })();
        // use arr.every to get draw
        // use every and nested loops to check if all values in aray elements are !== 0 to see if game draw

        // if all arrays contain NOT zero 
        // check if board[1] contains any zeros
        // use every() to check that all vals are NOT zero
        // repeat for each array inside board
        
        // tie 
        let zeroArray = [];
        (() => {
            const checkZeroArray = (arr) => arr !== 0;
            let answer;
            zeroArray = [];
                for (let i = 0; i < board.length; i++) {
                    answer = board[i].every(checkZeroArray);
                    zeroArray.push(answer);
                } return zeroArray;
        })();
        
        (() => {
            const allZero = (arr) => arr === true;
            let check = zeroArray.every(allZero);
            if (check === true) {
                if (gameWin === false) {
                    gameDraw = true;
                    console.log('draw!')
                }
            } else console.log('nah');
        })();
        

        // declare winner
        if (gameWin === true) {
            console.log('winner chosen');
            gameEnd = true;
        } else if (gameDraw === true) {
            console.log('it\'s a tie!');
            gameEnd = true;
        }

        if (gameEnd === true) {
            console.log('game over!');
            // create setDefault func and run here?
        }

    }
    if (gameEnd === true) {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

    }
    return { playMove, checkWinner }
})();



// gameEnd var -> end game if true --> function which executes to check game end? before starting new turn

// end game message, ask user to restart ??

// iterate through array to make sure all vals are NOT zero
// if none are zero, check if there's no win - if none => draw

function test() {
    console.log(gameDraw);
    console.log(gameWin);
}

// TO DO
// gameEnd + reset defaults function to start new game
// change win types to factory functions????
// add dom
// remove console logs
// each player should have the ability to play a move - factory 



// LOGIC FOR UI VER

// initialize gameboard
// const cellList = document.querySelectorAll(".cell");

const container = document.querySelector(".cell_container")


const BoardCell = (value, empty) => {
    value,
    empty = true;
    return { value, empty }
};

const cellArray = []

// create board
for (let i = 0; i < 9; i++) {
    let cell = BoardCell(i, true);
    cellArray.push(cell);
}

for (let i = 0; i < cellArray.length; i++) {
    const divCell = document.createElement("div");
    divCell.setAttribute("class", "cell");
    divCell.setAttribute("id", cellArray[i].value);
    container.appendChild(divCell);
}

const cellList = document.querySelectorAll(".cell");

cellList.forEach((cell) => {
    cell.addEventListener("click", () => {
        activePlayer.playAMove(cell);
    })
})


// SET ACTIVE PLAYER
// IF CELL CLICKED, PLACE ACTIVE PLAYER MARKER

const Player = (marker) => {
    // const active = false;
    // add back in to show "it's Player XYZ turn"
    const playAMove = (cell) => {
    // play move function
        // change cell status to "filled"
        if (cellArray[cell.id].empty === true) {
            cell.innerText = `${activePlayer.marker}`;
            console.log(activePlayer.marker);
            cellArray[cell.id].empty = false;
            switchPlayer();
        } else alert('Please choose another spot!');
            
    };
    return {marker, playAMove};
};

const playerOne = Player("X");
const playerTwo = Player("O");
// playerOne.playAMove(cell10)

const players = [ playerOne, playerTwo ];
let activePlayer = players[0];


const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
}





/*
const createBoard = (() => {

    const gameBoard = () => {
        
    }
    
    

    let cell00 = document.querySelector(".c00");
    let cell01 = document.querySelector(".c01");
    let cell02 = document.querySelector(".c02");
    let cell10 = document.querySelector(".c10");
    let cell11 = document.querySelector(".c11");
    let cell12 = document.querySelector(".c12");
    let cell20 = document.querySelector(".c20");
    let cell21 = document.querySelector(".c21");
    let cell22 = document.querySelector(".c22");
    
    
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].value = cellList[i].dataset.val;
        cellList[i].empty = true;
        console.log(cellList[i].value);
    }

    const gameBoard = [
        [cell00, cell01, cell02],
        [cell10, cell11, cell12],
        [cell20, cell21, cell22]
    ];
    */



// SET ACTIVE PLAYER
// IF CELL CLICKED, PLACE ACTIVE PLAYER MARKER
/*
const Player = (marker, active) => {
    // const active = false;
    // add back in to show "it's Player XYZ turn"
    const playAMove = (cell) => {
    // play move function
        // change cell status to "filled"
        if (cell.empty === true) {
            cell.innerText = `${activePlayer.marker}`;
            console.log(activePlayer);
            console.log('played a move');
            cell.empty = false;
            switchPlayer();
        } else alert("Please choose another spot!");
    };
    return {marker, playAMove};
};

const playerOne = Player("X");
const playerTwo = Player("O");
// playerOne.playAMove(cell10)

const players = [ playerOne, playerTwo ];
let activePlayer = players[0];

const gamePlay = (() => {
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
 return { switchPlayer }
})();





cellList.forEach((cell) => {
    cell.addEventListener("click", () => {
        activePlayer.playAMove(cell);
    })
})
*/