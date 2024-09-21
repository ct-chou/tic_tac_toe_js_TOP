const gameboard = (function() {
    let row1 = ["", "", ""];
    let row2 = ["", "", ""];
    let row3 = ["", "", ""];
    let board = [row1, row2, row3];
    function displayBoard() {
        console.log(board);
    }
    function placeMarker(row, column, marker) {
        if (board[row][column] === "") {
            board[row][column] = marker;
        }
        else {
            console.log("Invalid move");
        }
    }
    return {displayBoard, placeMarker};
})();

function newPlayer(name, symbol) {
    let wins = 0;
    
    const getWins = () => wins;
    const giveWin = () => wins++;
    const getName = () => name;
    const getSymbol = () => symbol;
    const resetWins = () => wins = 0;
    return {getWins, giveWin, getName, getSymbol, resetWins};
}

function newScoreBoard(player1, player2) {
    let turn = player1;
    function displayScore() {
        console.log(`${player1.getName()}: ${player1.getWins()} | ${player2.getName()}: ${player2.getWins()}`);
    }
    function resetScore() {
        player1.resetWins();
        player2.resetWins();
    }
    function changeTurn() {
        if (turn === player1) {
            turn = player2;
        } else {
            turn = player1;
        }
    }
    function getTurn() {
        console.log(turn.getName() + "'s turn");
    }
    return {displayScore, resetScore, changeTurn, getTurn};
}

const chris = newPlayer("Chris", "X");
const chelsea = newPlayer("Chelsea", "O");
const scoreBoardCC = newScoreBoard(chris, chelsea);
scoreBoardCC.displayScore();
scoreBoardCC.getTurn();
gameboard.placeMarker(0, 0, chris.getSymbol());
gameboard.displayBoard();
scoreBoardCC.changeTurn();
scoreBoardCC.getTurn();
gameboard.placeMarker(0, 0, chelsea.getSymbol());