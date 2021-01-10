
const players = (function() {
    //New player object (factory function)
    //Name of player, which symbol they've chosen, what the score is

    function newPlayer(firstName,symbol,score) {
        return {firstName,symbol,score}
    }
    
    //Add event listeners to the DOM to detect whether player 1/2 are human or AI

    function humanOrAiPlayers() {
        playersButtons = document.querySelectorAll('.players-buttons')
        for (let i = 0; i < playersButtons.length ; i++) {
            playersButtons[i].addEventListener('click',() => {
                let that = this;
                console.log(that)
            })
        }
    }

    humanOrAiPlayers()


    //Get names and store them as variables - CHANGE THESE BACK TO ALERTS
    const playerOneName = 'Player 1'
    const playerTwoName = 'Player 2'
    const playerOneSymbol = 'x'
    const playerTwoSymbol = 'o'
    /*
    let playerOneName = prompt('Player 1, what is your name?')
    let playerTwoName = prompt('Player 2, what is your name?')
    //Get symbol selection and store them as variables
    /*
    let playerOneSymbol = ''
    //Function makes sure that the players enter a valid symbol, otherwise it'll keep asking.
    function getSymbol() {
        playerOneSymbol = prompt('Player 1, please select either X or O').toLowerCase()
    }
    while (playerOneSymbol != 'x' && playerOneSymbol != 'o') {
        getSymbol()
    }
    //Set up the player 2 symbol to be the opposite of whatever player 1 is
    playerTwoSymbol = ''
    if (playerOneSymbol === 'x') {
        playerTwoSymbol = 'o'
    } else {
        playerTwoSymbol = 'o'
    }
    */


    let playerOne = newPlayer(playerOneName,playerOneSymbol,0)
    let playerTwo = newPlayer(playerTwoName,playerTwoSymbol,0)
    return {
        playerOne,
        playerTwo
    }
})();

let activePlayer = (function() {
    let currentPlayer = players.playerOne
    function getActivePlayer() {
        return currentPlayer
    }
    function changeActivePlayer() {
        if (currentPlayer === players.playerOne) {
            currentPlayer = players.playerTwo;
            } else {
            currentPlayer = players.playerOne;
        }
    }
    return {
        getActivePlayer,
        changeActivePlayer
    }
})();

const gameBoard = (function() {    
    //gameboard array
    let gameBoardArr = ['','','','','','','','','']
    //Set up event listeners in DOM
    const squaresNodeList = document.querySelectorAll('.squares')
    for (let i = 0; i < squaresNodeList.length;i++) {
        //Need to do something here this apply/call/bind to change the this context to the right thing (the element being triggered by the event listener)
        squaresNodeList[i].addEventListener('click', function() {
            let that = this;
            updateBoard(that);
        })
    }
    //Update board depending on which player is currently active
    //Which div has been clicked on the board
    function updateBoard(selectedSquare) {
            for (let i = 0; i < gameBoardArr.length; i++) {
                //If the ID of the selected DIV in the DOM and the gameboard array item is blank;
                if (selectedSquare.id === `square-${i}` && gameBoardArr[i] === '') {
                    //Update the gameboard array to be completely blank
                    gameBoardArr[i] = activePlayer.getActivePlayer().symbol;
                    //Display the board
                    displayBoardArr()
                    //Check for a winner
                    checkForWinner()
                    //Change the active player
                    activePlayer.changeActivePlayer()
                }
            }
    }

    //Diplay board in the DOM
    function displayBoardArr() {
        for (let i = 0; i < gameBoardArr.length;i++) {
            document.getElementById(`square-${i}`).textContent = gameBoardArr[i]
        }
    }
    //Check for winner function. Need to compare the array against all winning iterations

    function checkForWinner() {
        let symbol = activePlayer.getActivePlayer().symbol
        //3 on top row
        if (gameBoardArr[0] === symbol && gameBoardArr[1] === symbol && gameBoardArr[2] === symbol) {
            //create a function here depending on what happens if someone wins
            declareWinner()
        //3 on middle row
        } else if (gameBoardArr[3] === symbol && gameBoardArr[4] === symbol && gameBoardArr[5] === symbol) {
            declareWinner()
        //3 on bottom row
        } else if (gameBoardArr[6] === symbol && gameBoardArr[7] === symbol && gameBoardArr[8] === symbol) {
            declareWinner()
        } else if (gameBoardArr[0] === symbol && gameBoardArr[3] === symbol && gameBoardArr[6] === symbol) {
            declareWinner()
        } else if (gameBoardArr[1] === symbol && gameBoardArr[4] === symbol && gameBoardArr[7] === symbol) {
            declareWinner()
        } else if (gameBoardArr[2] === symbol && gameBoardArr[5] === symbol && gameBoardArr[8] === symbol) {
            declareWinner()
        } else if (gameBoardArr[0] === symbol && gameBoardArr[4] === symbol && gameBoardArr[8] === symbol) {
            declareWinner()
        } else if (gameBoardArr[2] === symbol && gameBoardArr[4] === symbol && gameBoardArr[6] === symbol) {
            declareWinner()
        }
    }

    function declareWinner() {
        alert(`${activePlayer.getActivePlayer().firstName} wins!`)
        let playAgain = ''
        while (playAgain != 'y' && playAgain != 'n') {
            playAgain = prompt('Would you like to play again? Type y for Yes and n for No').toLowerCase();
        }
        if (playAgain === 'y') {
            newGame()
            //If you don't want to continue playing, remove all the event listeners
        } else if (playAgain = 'n') {
            noNewGame()
        }
    }

    function newGame() {
        gameBoardArr = ['','','','','','','','','']
        displayBoardArr()
    }

    function noNewGame() {
        document.getElementById('gameboard-container').innerHTML = '<p>Thanks for playing!</p>'
    }

    
})();