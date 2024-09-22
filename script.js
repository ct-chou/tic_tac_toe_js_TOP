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

const scoreBoard = (function () {
    let player1;
    let player2;
    let turn;
    
    function newScoreBoard(p1, p2) {
        player1 = p1;
        player2 = p2;
    }
    
    function displayScore() {
        return [player1.getWins(), player2.getWins()];
        // console.log(`${player1.getName()}: ${player1.getWins()} | ${player2.getName()}: ${player2.getWins()}`);
    }
    function resetScore() {
        player1.resetWins();
        player2.resetWins();
    }

    function setTurn(player) {
        turn = player;
    }

    function changeTurn() {
        if (turn === player1) {
            turn = player2;
        } else {
            turn = player1;
        }
    }
    function getTurn() {
        return turn.getName();
        console.log(turn.getName() + "'s turn");
    }
    return {newScoreBoard, displayScore, resetScore, setTurn, changeTurn, getTurn};
})();

const matchButton = document.querySelector("#new-matchup");
const dialog = document.getElementById("match-dialog");
const cancelDialog = document.querySelector("#cancelBtn");
const confirmDialog = document.querySelector("#confirmBtn");

matchButton.addEventListener("click", () => {
    dialog.showModal();
    document.getElementById("player1-input").value = "";
    document.getElementById("player2-input").value = "";
});

cancelDialog.addEventListener("click", () => {
    dialog.close();
});



const scoreBoardDOM = (function () {
    function updateScore() {
        const [score1, score2] = scoreBoard.displayScore();
        document.getElementById("player1-wins").textContent = `${score1}`;
        document.getElementById("player2-wins").textContent = `${score2}`;
    }
    function updateNames(player1, player2) {
        document.getElementById("player1-name").textContent = player1;
        document.getElementById("player2-name").textContent= player2;
    }
    function updateTurn() {
        const turn = scoreBoard.getTurn();
        document.getElementById("turn").textContent = `${turn}'s turn`;
    }
    return {updateScore, updateNames, updateTurn};
})();

confirmDialog.addEventListener("click", (e) => {
    e.preventDefault();
    const newName1 = document.getElementById("player1-input").value;
    const newName2 = document.getElementById("player2-input").value;
    let p1 = newPlayer(newName1, "X");
    let p2 = newPlayer(newName2, "O");
    scoreBoard.newScoreBoard(p1, p2);
    scoreBoard.displayScore();
    scoreBoard.setTurn(p1);
    scoreBoardDOM.updateNames(newName1, newName2);
    scoreBoardDOM.updateScore();
    scoreBoardDOM.updateTurn();
    dialog.close();
});

// const scoreBoardCC = newScoreBoard(chris, chelsea);
// scoreBoardCC.displayScore();
// scoreBoardCC.getTurn();
// gameboard.placeMarker(0, 0, chris);
// gameboard.displayBoard();
// scoreBoardCC.changeTurn();
// scoreBoardCC.getTurn();
// gameboard.placeMarker(1, 0, chelsea);