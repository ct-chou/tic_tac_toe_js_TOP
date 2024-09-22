const gameBoard = (function() {
    let row1 = ["", "", ""];
    let row2 = ["", "", ""];
    let row3 = ["", "", ""];
    let board = [row1, row2, row3];
    totalMoves = 0;
    game_over = false;

    function displayBoard() {
        console.log(board);
    }
    
    function placeMarker(row, column, player) {
        if (game_over) {
            return false;
        }
        if (board[row][column] === "") {
            board[row][column] = player.getMarker();
            totalMoves++;
            return true;
        }
        else {
            return false;
        }
    }

    function checkWinner(player) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
                console.log(`${player.getName()} wins`);
                scoreBoard.playerWins(player);
                game_over = true;
                return player.getName();
            }
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
                console.log(`${player.getName()} wins`);
                scoreBoard.playerWins(player);
                game_over = true;
                return player.getName();
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            console.log(`${player.getName()} wins`);
            scoreBoard.playerWins(player);
            game_over = true;
            return player.getName();
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
            console.log(`${player.getName()} wins`);
            scoreBoard.playerWins(player);
            game_over = true;
            return player.getName();
        }
        if (totalMoves === 9) {
            console.log("It's a tie");
            return "tie";
        }
        console.log("Next turn");
        return 0;
    }
    function newGame() {
        row1 = ["", "", ""];
        row2 = ["", "", ""];
        row3 = ["", "", ""];
        board = [row1, row2, row3];
        totalMoves = 0;
        game_over = false;
    }

    return {displayBoard, placeMarker, checkWinner, newGame};
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
    
    function playerWins(player) {
        player.giveWin();
    }

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
        return turn;
    }
    return {playerWins, newScoreBoard, displayScore, resetScore, setTurn, changeTurn, getTurn};
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
        document.getElementById("turn").textContent = `${turn.getName()}'s turn`;
    }
    function updateWinner(winner) {
        document.getElementById("turn").textContent = `${winner} wins!`;
    }
    function updateTie() {
        document.getElementById("turn").textContent = "It's a tie!";
    }
    return {updateScore, updateNames, updateTurn, updateWinner, updateTie};
})();

const gameBoardDOM = (function () {
    function placeMarker(row, column, marker) {
        let cell = document.getElementById(`row${row}-col${column}`);
        cell.textContent = marker;
    }
    function clearBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.getElementById(`row${i}-col${j}`);
                cell.textContent = '';
            }
        }
    }
    return {placeMarker, clearBoard};
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
    gameBoardDOM.clearBoard();
    dialog.close();
});

const newGameBtn = document.querySelector("#new-game");

newGameBtn.addEventListener("click", () => {
    gameBoard.newGame();
    scoreBoard.changeTurn();
    scoreBoardDOM.updateTurn();
    gameBoardDOM.clearBoard();
});

const resetScoreBtn = document.querySelector("#reset");
resetScoreBtn.addEventListener("click", () => {
    scoreBoard.resetScore();
    scoreBoardDOM.updateScore();
});

const boardContainer = document.querySelector(".container-board");
const divBoard = boardContainer.querySelectorAll("div");

let i = 0;
let j = 0;
divBoard.forEach(square => {
    const span = document.createElement("span");
    span.id = "row" + i + "-col" + j;
    square.appendChild(span);
    j++;
    if (j === 3) {
        i++;
        j = 0;
    }
});

const cells = boardContainer.querySelectorAll("span");

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        const id_full = e.target.id;
        const row = parseInt(id_full[3]);
        const column = parseInt(id_full[8]);
        const currentPlayer = scoreBoard.getTurn();
        const marker = currentPlayer.getMarker();
        valid = gameBoard.placeMarker(row, column, currentPlayer);
        if (valid === true) {
            gameBoardDOM.placeMarker(row, column, marker);
            const winner = gameBoard.checkWinner(currentPlayer);
            console.log(winner);
            if (winner === 0) {
                scoreBoard.changeTurn();
                scoreBoardDOM.updateTurn();
            } else if (winner === "tie") {
                scoreBoard.changeTurn();
                scoreBoardDOM.updateTie();
            } else{
                scoreBoardDOM.updateScore();
                scoreBoard.changeTurn();
                scoreBoardDOM.updateWinner(winner);
            }
        }
    });
});
