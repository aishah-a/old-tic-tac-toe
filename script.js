"use strict"

const container = document.querySelector(".cell_container");
const replayBtn = document.createElement('button');
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

    // add to board array  so can check wins
    function addToBoard(index, num) {
        gameBoard[index].push(cellArray[num])
    }

    // see if way to increment index in add to board and reduce number of loops
    for (let i = 0; i < 3; i++) {
        // for (let j = 0; j < i; j++){
        addToBoard(0, i)
    }

    for (let i = 3; i < 6; i++) {
        // for (let j = 0; j < i; j++){
        addToBoard(1, i)
    }

    for (let i = 6; i < 9; i++) {
        // for (let j = 0; j < i; j++){
        addToBoard(2, i)
    }
    
    replayBtn.setAttribute('class', 'replay');
    replayBtn.innerText = 'Restart'
    board.appendChild(replayBtn);

})();


const Player = (playerName, marker) => {
    playerName
    // add back in to show "it's Player XYZ turn"
        const playAMove = (cell) => {
            // play move function
            // change cell status to "filled"
            if (cellArray[cell.id].empty === true) {
                cell.innerText = `${activePlayer.marker}`;

                cellArray[cell.id].empty = false;
                cellArray[cell.id].marked = activePlayer.marker;
                game.gamePlay();
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

    const gamePlay = () => { //gameplay used to be called checkWinner
        let gameWin = false;
        let gameDraw = false;


        const checkWin = (() => {

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
                        gameWin = true;
                    } else if ((gameBoard[2][0].marked === gameBoard[1][1].marked) && (gameBoard[1][1].marked === gameBoard[0][2].marked)) {
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
            (() => {
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
            })();
        })();

        const declareWinner = () => {
            activePlayer.marker === 'X' ? winner = playerOne : winner = playerTwo;
            text.remove();
            const declare = document.createElement('div');
            declare.setAttribute('id', 'prompt');
            declare.innerText = winner.playerName + ' wins!'
            board.insertBefore(declare, container);

        }

        const endGame = () => {
            replayBtn.style.backgroundColor = 'var(--orange)';
            replayBtn.style.color = 'white';
            replayBtn.style.opacity = '1.0';


            replayBtn.addEventListener('click', () => {
                replayBtn.style.transform = 'translateY(3px)';
                location.reload();
            })

            replayBtn.addEventListener('mouseenter', () => {
                replayBtn.style.backgroundColor = '#F03C05';
            })

            replayBtn.addEventListener('mouseleave', () => {
                replayBtn.style.backgroundColor = 'var(--orange)';
            })
        }
    
        if (gameWin === true) {
            declareWinner();
            endGame();
            gameEnd = true;
        } else if (gameDraw === true) {
            console.log('it\'s a tie!');
            text.innerText = 'It\s a tie!'
            text.innerText = 'Tie!'
            gameEnd = true;
        }
    
    }
    return {switchPlayer, gamePlay }

})();
