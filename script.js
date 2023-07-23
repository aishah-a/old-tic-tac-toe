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
            console.log(board);
            checkWinner();
            switchPlayer();
        }
    }   

    // implement winning conditions
    // diagonal - if array[0][0] === array[1][1] === array[2][2]

    function checkWinner() {

        let gameWin = false;
        let gameDraw = false;
        // let gameEnd = false;

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



        // declare winner
        if (gameWin === true) {
            console.log('winner chosen');
        } else if (gameDraw === true) {
            console.log('it\'s a tie!')
        }

    } return { playMove, checkWinner }
    
})();


(() => {
    let checkZeroArr;

    const checkZero = () => {
        let answer;
        checkZeroArr = []
        const checkZeroArr = (arr) => arr !== 0;
        for (let i = 0; i < board.length; i++) {
            answer = board[i].every(checkZeroArr);
            checkZeroArr.push(answer);
        }
        return checkZeroArr;
    }

    const checkTie = () => {
        const allZero = (arr) => arr === true;
        let check = checkZeroArr.every(allZero);
        if (check === true) {
            if (gameWin === false) {
                gameDraw = true;
            }
        }
    }

    return { checkZero, checkTie }
})();


// gameEnd var -> end game if true --> function which executes to check game end? before starting new turn

// end game message, ask user to restart ??


function test() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0 && gameWin === true) {
                gameEnd = true;
            } 
        }
    }

    if (gameEnd === true) {
        console.log('game end!');
    }
}


// iterate through array to make sure all vals are NOT zero
// if none are zero, check if there's no win - if none => draw



// go through each [i] in array
            // if all vals not 0 in each
            /*
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]

                [
                    [X, O, O],
                    [X, O, X],
                    [O, X, O]
                ]

                check if each inner array returns true for NO ZEROS
                push each value into a new array
                e.g. [true, true, false]
                use EVERY on new array
                if new array returns true for NO ZEROS
                no zeros = TRUE
                then check if game win
            */