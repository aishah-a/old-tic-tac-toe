const board = (() => {
    // OR return new Array(3).fill(0).map(() => new Array(3).fill(0));
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
})();







const gameController = (() => {

    /* 
    > check active player - if one player active, other = inactive
    > if player active, place marker - check if array location contains marker or zero
    > if player has placed marker, switch players
    */

    function Player(marker) {
        marker,
        placeMarker = (row, column) => {
            board[row].splice(column, 1, marker);
            console.log(board);
            switchPlayer();
            console.log(activePlayer);
        };
        return { marker, placeMarker };
    }

    playerOne = Player("X");
    playerTwo = Player("O");

    const players = [
        { playerOne },
        { playerTwo }
    ]


    let activePlayer = players[0];

    const switchPlayer = () => {
       activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    

    if (activePlayer === players[0]) {
        console.log("Player One's turn.");
        console.log(board);
    } else console.log("Player Two's turn.");



})();

