const gameboard = (function() {
    let row1 = ["", "", ""];
    let row2 = ["", "", ""];
    let row3 = ["", "", ""];
    let board = [row1, row2, row3];
    totalMoves = 0;

    function displayBoard() {
        console.log(board);
    }
    
    function placeMarker(row, column, player) {
        if (board[row][column] === "") {
            board[row][column] = player.getMarker();
            totalMoves++;
            checkWinner(player);
        }
        else {
            console.log("Invalid move");
        }
    }

    function checkWinner(player) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
                console.log(`${player.getName()} wins`);
                player.giveWin();
                return player.getName();
            }
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
                console.log(`${player.getName()} wins`);
                player.giveWin();
                return player.getName();
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            console.log(`${player.getName()} wins`);
            player.giveWin();
            return player.getName();
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
            console.log(`${player.getName()} wins`);
            player.giveWin();
            return player.getName();
        }
        if (totalMoves === 9) {
            console.log("It's a tie");
            return "tie";
        }
        console.log("Next turn");
        return null
    }

    return {displayBoard, placeMarker};
})();

function newPlayer(name, marker) {
    let wins = 0;
    
    const getWins = () => wins;
    const giveWin = () => wins++;
    const getName = () => name;
    const getMarker = () => marker;
    const resetWins = () => wins = 0;
    return {getWins, giveWin, getName, getMarker, resetWins};
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
gameboard.placeMarker(0, 0, chris);
gameboard.displayBoard();
scoreBoardCC.changeTurn();
scoreBoardCC.getTurn();
gameboard.placeMarker(1, 0, chelsea);