const gameboard = (() => {
    // OR return new Array(3).fill(0).map(() => new Array(3).fill(0));
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
}
)();

const Player = (name, marker) => {
    // figure out something here
    name: name
    marker: marker

    const placeMarker = (row, column) => {
        gameboard[row].splice(column, 1, marker);
    }

    return { name, marker, placeMarker }
};


const gameController = (() => {

    /*
    const placeMarker = (row, column) => {
        gameboard[row].splice(column, 1, marker);
    }
    return { placeMarker }
    */

})

