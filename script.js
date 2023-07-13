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
        }
    }    
    
    
    // implement winning conditions
    function checkWinner() {
        // horizontal
        board.forEach(element => {
            if (element[0] === element[1] && element[1] === element[2]) { 
                console.log('horizontal win!')
            }
            else console.log('nope');
        })
        // vertical - google how to use map to iterate over columns to check for vertical win
        board.forEach(element => {
            if (element[0] === element[1] && element[1] === element[2]) { 
                console.log('horizontal win!')
            }
            else console.log('nope');
    })

        
        // check for 3 in a row
        // horizontal - for loop - for each row in board array, if all three vals match
        // vertical - if array[0][0] === array[1][0] === array[2][0] -> for all three cols
        // diagonal - if array[0][0] === array[1][1] === array[2][2]
        // OR 
    
    return { playMove, checkWinner }

})();

