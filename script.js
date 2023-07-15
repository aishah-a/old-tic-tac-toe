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

    playerOne = Player("X");
    playerTwo = Player("O");

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
            switchPlayer();
            checkWinner();
        }
    }   

    // implement winning conditions
    // check for 3 in a row - change to: if val !== 0, run nested for loop
    // horizontal - for loop - for each row in board array, if all three vals match
    // vertical - if array[0][0] === array[1][0] === array[2][0] -> for all three cols
    // diagonal - if array[0][0] === array[1][1] === array[2][2]

    function checkWinner() {
        // horizontal
        /*
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; i < board.length; i++) {
                // do something
                board[i].forEach(element => {
                    if (element[0] === element[1] === element[2]) {
                        // gameEnd = true
                        console.log('horizontal win!')
                    }
                })
                
            }}
                    
        }
        */
        
        board.forEach(element => {
            if ((element[0] === element[1] && element[1] === element[2]) && element[0] !== 0) { 
                // gameEnd = true - if false, stop game
                // if element[1] = X > winner is P1, else P2
                console.log('horizontal win!');
            }
        })
        // vertical - google how to use map to iterate over columns to check for vertical win

        /*
        board.forEach(element => {
            if (element[0] === element[1] && element[1] === element[2]) { 
                console.log('horizontal win!')
            }
            else console.log('nope');
        })
    
        */
    
        // iterate through each row with for loop
        // in each row - take [0] and push into col1 array, repeat 3 times
        // 3 column arrays
        // if all values match - vertical win


    } return { playMove, checkWinner }
})();


function verticalWin() {

    let col1 = []
    let col2 = []
    let col3 = []

    // iterate through array with for loop
    const checkCol = (column, index)  => {
        for (let i = 0; i < board.length; i++) {
            column.push(board[i][index]);
        }
    }

    checkCol(col1, 0);
    checkCol(col2, 1);
    checkCol(col3, 2);
   

    const allEqual = arr => arr.every(val => val === arr[0]);

    const resultCol1 = allEqual(col1);
    const resultCol2 = allEqual(col2);
    const resultCol3 = allEqual(col3);
    
    return { resultCol1, resultCol2, resultCol3 };

    

}






