const board = (() => {
    // OR return new Array(3).fill(0).map(() => new Array(3).fill(0));
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

})();


let gameWin = false;
let gameDraw = false;
let gameEnd = false;

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
            const checkVal = (column, result) => {
                if ((result === true) && (column[1]) !== 0) {
                    result = true;
                } else result = false;
                return result;
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

        // draw
        (() => {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] !== 0 && gameWin === false) {
                        gameDraw = true;
                    }
                }
            }
        })();

        if (gameWin === true) {
            console.log('winner chosen');
        } else if (gameDraw === true) {
            console.log('it\'s a tie!')
        }

    } return { playMove, checkWinner }
    
})();

// add IIFE for if tie/no win
// if all cells filled with !== 0 and IF win === false -> draw


// for each cell -> if !==0, end = false, if cell === 0 AND win== false

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
