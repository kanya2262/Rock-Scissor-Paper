let userScore = 0;
let computerScore = 0;
let gamesPlayed = 0;
let playerName;
let gameStarted = false; // Declare gameStarted here
let clickCount = 0;


const choices = document.querySelectorAll(".choice");
const actionMsg = document.querySelector('#action-message');
const userScorePara = document.querySelector('#user-score');
const computerScorePara = document.querySelector('#computer-score');
const playerNamePara = document.querySelector('#player-name');
const playerNameInput = document.querySelector('#player-name-input');
const startGameButton = document.querySelector('#start-game');
const clickCountPara = document.querySelector('#click-count');
const resetGameButton = document.querySelector('#reset-game');


//Start Game
startGameButton.addEventListener('click', () => {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        playerNameInput.classList.add('error');
        return;
    }
    playerNamePara.textContent = `Player Name is: ${playerName}`;
    gameStarted = true; // Set the flag to true when the game starts

    // Reset scores and click count
    userScore = 0;
    computerScore = 0;
    gamesPlayed = 0;
    clickCount = 0;

    // Update score and click count displays
    userScorePara.textContent = userScore;
    computerScorePara.textContent = computerScore;
    clickCountPara.textContent = `Total Clicks: ${clickCount}`;

    // Clear the input field
    playerNameInput.value = '';

    // Add event listeners to choices here
    choices.forEach((choice) => {
        choice.removeEventListener("click", choiceClicked); // Remove any existing event listeners
        choice.addEventListener("click", choiceClicked); // Add the event listener
    });
});


resetGameButton.addEventListener('click', () => {
    // Reset scores and click count
    userScore = 0;
    computerScore = 0;
    gamesPlayed = 0;
    clickCount = 0;

    // Update score and click count displays
    userScorePara.textContent = userScore;
    computerScorePara.textContent = computerScore;
    clickCountPara.textContent = `Total Clicks: ${clickCount}`;

    // Clear the action message
    // actionMsg.textContent = '';
    actionMsg.className = ''; // Remove all classes

    // Remove the event listeners from the choices
    choices.forEach((choice) => {
        choice.removeEventListener("click", choiceClicked);
    });

    // Set gameStarted to false
    gameStarted = false;
});


//Generate computer choice
const genCompChoice = () => {
    const options = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}


//Game Draw
const drawGame = (userChoice) => {
    actionMsg.textContent = `Game was draw. You both chose ${userChoice}. Play Again!`;
    actionMsg.className = ''; // Remove all classes
    actionMsg.classList.add('game-draw');
    // actionMsg.style.backgroundColor = "orange";
}

//show winner
const showWinner = (userWin, userChoice, computerChoice) => {
    actionMsg.className = ''; // Remove all classes
    if (userWin) {
        actionMsg.textContent = `${playerName} Win! ${userChoice} Beats ${computerChoice}`;
        actionMsg.classList.add('game-win');
        // actionMsg.style.backgroundColor = "green";
        userScore++;
        userScorePara.textContent = userScore;
    } else {
        computerScore++;
        computerScorePara.textContent = computerScore;
        actionMsg.textContent = `You Lost. ${computerChoice} Beats ${playerName}'s ${userChoice}`;
        actionMsg.classList.add('game-lose');
        // actionMsg.style.backgroundColor = "red";
    };
};

// Define the function separately
const choiceClicked = (event) => {
    // Check if a player name has been set and the game has started
    if (!playerName || !gameStarted) {
        playerNameInput.classList.add('error');
        return; // Exit the function if no player name has been set or the game has not started
    }
    //count the click
    clickCount++;
    clickCountPara.textContent = `Total Clicks: ${clickCount}`;

    // Get the id of the clicked element and store it in a variable
    const userChoice = event.currentTarget.getAttribute("id");
    playGame(userChoice);
};

// Remove the error class when the user types into the input field
playerNameInput.addEventListener('input', () => {
    playerNameInput.classList.remove('error');
});

// Add the event listener
choices.forEach((choice) => {
    choice.addEventListener("click", choiceClicked);
});


//Game over
const gameOver = (userChoice) => {
    actionMsg.textContent = `Game Over! Final score: ${playerName}: ${userScore}, Computer: ${computerScore}`;
    // actionMsg.style.backgroundColor = "blue";
    actionMsg.className = ''; // Remove all classes
    actionMsg.classList.add('game-over');
    choices.forEach(choice => choice.removeEventListener("click", choiceClicked));
    gameStarted = false; // Set gameStarted to false when the game is over
};

//Game win
const playGame = (userChoice) => {
    if (!gameStarted) { // Check if the game has started
        return; // If the game has not started, exit the function
    }
    gamesPlayed++;
    //Generate computer choice
    const computerChoice = genCompChoice();

    //Game Draw
    if (userChoice === computerChoice) {
        drawGame(userChoice);
    } else {
        //Game win 
        let userWin = true;
        if (userChoice === 'Rock') {
            userWin = computerChoice === 'Paper' ? false : true;
        } else if (userChoice === 'Paper') {
            userWin = computerChoice === 'Scissors' ? false : true;
        } else {
            userWin = computerChoice === 'Rock' ? false : true;
        }

        showWinner(userWin, userChoice, computerChoice);
    }

    if (gamesPlayed === 10) {
        gameOver(userChoice);
    }
};

