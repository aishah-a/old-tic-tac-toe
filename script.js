const board = (() => {
    // OR return new Array(3).fill(0).map(() => new Array(3).fill(0));
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
})();


const gameController = (() => {

    console.log(board);

    function Player(marker) {
        marker
        /*
        placeMarker = (row, column) => {
            board[row].splice(column, 1, marker);
            console.log(board);
            switchPlayer();
            console.log(activePlayer);
        }; */
        return { marker /* placeMarker */ };
    }

    playerOne = Player("X");
    playerTwo = Player("O");

    const players = [ playerOne, playerTwo]

    let activePlayer = players[0];

    showActivePlayer();

    
    // check active player - if one player active, other = inactive
    // if player active, place marker - check if array location contains marker or zero
    // if player has placed marker, switch players


    const switchPlayer = () => {
       activePlayer = activePlayer === players[0] ? players[1] : players[0];
       showActivePlayer();
    }
    
    function showActivePlayer() {
        activePlayer === players[0] ? console.log("Player One's turn.") : console.log("Player Two's turn.");
        /*
        if (activePlayer === players[0]) {
            console.log("Player One's turn.");
        } else {
            console.log("Player Two's turn.")
        };
        */
    }
    

    // only allow active player to play - condense into one function
    // check for empty spots on board

    function playMove(row, column) {
        board[row].splice(column, 1, activePlayer.marker);
        console.log(board);
        switchPlayer();
        console.log(activePlayer);

        // console.log('here')
        // console.log(players[0].marker);
        // console.log(activePlayer.marker);
    } return { playMove }
    /*
    placeMarker = (row, column) => {
        board[row].splice(column, 1, marker);
        console.log(board);
        switchPlayer();
        console.log(activePlayer);
    }
    */

})();

