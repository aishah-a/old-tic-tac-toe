"use strict"

// CONSOLE VER
/*
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

*/

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
const cellArray = [];
let gameBoard = [ [], [], []];

const BoardCell = (value, marked, empty) => {
    value,
    marked,
    empty = true;
    return { value, empty }
};

// create board
const initBoard = (() => {
    // create array list of cell objects - see if can be merged with gameboard
    for (let i = 0; i < 9; i++) {
        let cell = BoardCell(i, true);
        cellArray.push(cell);
        const divCell = document.createElement("div");
        divCell.setAttribute("class", "cell");
        divCell.setAttribute("id", cellArray[i].value);
        container.appendChild(divCell);
    }

    // add to board array  so can check wins
    function addToBoard(index, num) {
        gameBoard[index].push(cellArray[num])
    }

    // see if way to increment index in add to board and reduce number of functions
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

const gamePlay = (() => {
    
    const Player = (marker) => {
        // const active = false;
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
                switchPlayer();
            } else alert('Please choose another spot!');
                
        };
        return {marker, playAMove};
    };

    const playerOne = Player("X");
    const playerTwo = Player("O");
    const players = [ playerOne, playerTwo ];

    let activePlayer = players[0];

    const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const cellList = document.querySelectorAll(".cell");

    cellList.forEach((cell) => {
    cell.addEventListener("click", () => {
        activePlayer.playAMove(cell);
    })
    })
   
    return { playerOne, playerTwo, switchPlayer }
})();

// winning logic


const game = (() => {

    let gameEnd = false;
    console.log(gameBoard);

    // winning conditions

    function checkWinner() {

        let gameWin = false;
        let gameDraw = false;

        const checkWin = (arr) => {
            const crossWin = arr => arr.every((obj) => {
                return obj.marked === 'X';
            });
            const noughtWin = arr => arr.every((obj) => {
                return obj.marked === 'O';
            });
            return { crossWin, noughtWin }
        }

        // diagonal
        (() => {
            if (gameBoard[1][1].empty === false) {
                if ((gameBoard[0][0].marked === gameBoard[1][1].marked) && (gameBoard[1][1].marked === gameBoard[2][2].marked)) {
                    console.log('diag win');
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


            // check if MARKED for all column array vals are the same

            // maybe FOR loops change to a function which takes the array as input (i.e. cols) and all the rest is the same 
            for (let i = 0; i < gameBoard.length; i++) {
                // instantiate new obj from factory func
                let result = checkWin(cols[i]); 
                result = result.crossWin(cols[i])
                if (result === true) {
                    gameWin = true;
                }
            }   
    
            for (let i = 0; i < gameBoard.length; i++) {
                // instantiate new obj from factory func
                let result = checkWin(cols[i]); 
                result = result.noughtWin(cols[i])
                if (result === true) {
                    gameWin = true;
                }
            }   
    
        })();


        // horizontal

        // create a global(?) or game object-level factory function for the crossWin and noughtWin function as it keeps being reused
        (() => {

            for (let i = 0; i < gameBoard.length; i++) {
                // instantiate new obj from factory func
                let result = checkWin(gameBoard[i]); 
                result = result.crossWin(gameBoard[i])
                if (result === true) {
                    gameWin = true;
                }
            }   
        
            for (let i = 0; i < gameBoard.length; i++) {
                // instantiate new obj from factory func
                let result = checkWin(gameBoard[i]); 
                result = result.noughtWin(gameBoard[i])
                if (result === true) {
                    gameWin = true;
                }
            }   
 
        })();


        // tie 

        // check if all the cells.empty === FALSE
        // push 'check every is marked' result to array
        // if each inner array is marked
        // if all cells are NOT empty and gameWin === false

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

        if (gameEnd === true) {
            console.log('done!');
        }
    }

    return { checkWinner }
})();
