let playerScores = 0;
let computerScores = 0;
let rounds = 1;


// let computerSelection = computerPlay();
// let playerSelection = getInput();


// This function randomly return 1, 2, or 3 (corresponds to Rock, Paper, Scissor)
function computerPlay() {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    return getRandomInt(1, 3);
}

// Ask the player to choose an option
function getInput() {
    // Keep asking until the player entered a valid option
    while (true) {
        let choice = +prompt(
            `Choose an option:
            1. Rock
            2. Paper
            3. Scissors`
        );

        if (choice === 1 || choice === 2 || choice === 3) {
            return choice;
        }

        alert("You should press 1, 2, or 3")
    }
}

// This function decide the result of each round
function decideRoundResult(playerSelection, computerSelection) {
    if (computerSelection === 1 && playerSelection === 3) {             // player: scissors, computer: rock
        return -1;   // the player lost
    } else if (playerSelection === 1 && computerSelection === 3) {      // player: rock, computer: scissors
        return 1;   // the player won
    } else if (playerSelection < computerSelection) {       // paper beats rock, scissors beat paper
        return -1;   // the player lost
    } else if (playerSelection > computerSelection) {       // paper beats rock, scissors beat paper
        return 1;   // the player won
    } else {
        return 0;   // a tie
    }
}

// This function prints the result of each round
function printRoundResult(playerSelection, computerSelection) {
    let result = decideRoundResult(playerSelection, computerSelection);

    playerSelection = convertSelection(playerSelection);
    computerSelection = convertSelection(computerSelection);

    switch (result) {
        case -1:
            alert(`You lost! ${computerSelection} beats ${playerSelection}`);
            break;
        case 1:
            alert(`You won! ${playerSelection} beats ${computerSelection}`);
            break;
        case 0:
            alert("Tied match!");
            break;
        default:
            alert("Something is wrong!");
    }
}

// This function converts the selection value (1, 2, 3) to the corresponding string
function convertSelection(selection) {
    return (
        selection === 1 ? "rock"
            : selection === 2 ? "paper"
                : "scissors"
    );
}

// This function update the score in the entire game
function updateScore(playerSelection, computerSelection) {
    switch (decideRoundResult(playerSelection, computerSelection)) {
        case 1:     // player won
            playerScores++;
            break;
        case -1:    // player lost
            computerScores++;
            break;
        case 0:     // tied
            break;
        default:
            alert("Something is wrong!");
    }
}