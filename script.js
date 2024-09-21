const gameboard = (function() {
    let row1 = ["", "", ""];
    let row2 = ["", "", ""];
    let row3 = ["", "", ""];
    let board = [row1, row2, row3];
    function displayBoard() {
        console.log(board);
    }

    return {displayBoard};
})();

function newPlayer(name, symbol) {
    let wins = 0;
    
    const getWins = () => wins;
    const giveWin = () => wins++;
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getWins, giveWin, getName, getSymbol};
}

const chris = newPlayer("Chris", "X");
const chelsea = newPlayer("Chelsea", "O");
