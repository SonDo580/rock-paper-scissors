// Define constants
// At first I used numeric value, but that's too vagued
const WON = 'WON';
const LOST = 'LOST';
const TIED = 'TIED';
const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';

while (true) {
    let playerScores = 0;
    let computerScores = 0;
    let rounds = 1;
    let canceled = false;   // becomes "true" if the player cancel in the middle of a game

    while (rounds <= 5) {
        // start round
        let computerSelection = computerPlay();
        let playerSelection = getInput(rounds);
        if (playerSelection === null) {
            canceled = true;
            break;
        } else {
            printRoundResult(playerSelection, computerSelection);

            // Update the score
            // At first I used a function to do this, but it can't modify playerScores and computerScores
            // In some language, there's something called "pass by reference", besides "pass by value".
            // But in JavaScript, only Objects are passed by reference
            switch (decideRoundResult(playerSelection, computerSelection)) {
                case WON:     // player won
                    playerScores++;
                    break;
                case LOST:    // player lost
                    computerScores++;
                    break;
                case TIED:     // tied
                    break;
                default:
                    alert("Something is wrong!");
            }
        }
        // end round

        rounds++;
    }

    // This is when the player cancels in the middle of the game
    if (canceled) {
        alert("You canceled the game!");
        break;
    }

    showFinalResult(playerScores, computerScores);

    if (!confirm("Do you want to play again?")) {
        alert("You canceled the game!");
        break;
    }
}


// This function randomly return the string 'Rock', 'Paper', or 'Scissors'
function computerPlay() {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    let computerSelection = getRandomInt(1, 3);

    return convertSelection(computerSelection);
}

// Ask the player to choose an option
function getInput(rounds) {
    // Keep asking until the player entered a valid option
    while (true) {
        // At first I used the "+" operator (+prompt(...)) to convert the input to number.
        // But if the user click "Cancel", "choice" will be null. Then it'll be converted to 0.
        // So "choice === null" (in the else if) will never be true.
        let choice = prompt(
            `ROUND ${rounds} - Choose an option:
            1. Rock
            2. Paper
            3. Scissors`
        );

        // use "==" when comparing to allow type conversion
        if (choice == 1 || choice == 2 || choice == 3) {
            choice = +choice;       // convert to number
            return convertSelection(choice);    // return "Rock", "Paper", or "Scissors"
        } else if (choice === null) {
            return choice;
        } else {
            alert("You should press 1, 2, or 3");
        }
    }
}

// This function decide the result of each round
function decideRoundResult(playerSelection, computerSelection) {
    if (playerSelection === SCISSORS && computerSelection === ROCK
        || playerSelection === ROCK && computerSelection === PAPER
        || playerSelection === PAPER && computerSelection === SCISSORS
    ) {
        return LOST;

    } else if (playerSelection === ROCK && computerSelection === SCISSORS
        || playerSelection === PAPER && computerSelection === ROCK
        || playerSelection === SCISSORS && computerSelection === PAPER
    ) {
        return WON;

    } else {
        return TIED;
    }
}

// This function prints the result of each round
function printRoundResult(playerSelection, computerSelection) {
    let result = decideRoundResult(playerSelection, computerSelection);

    switch (result) {
        case LOST:
            alert(`You lost! ${computerSelection} beats ${playerSelection}`);
            break;
        case WON:
            alert(`You won! ${playerSelection} beats ${computerSelection}`);
            break;
        case TIED:
            alert("Tied match!");
            break;
        default:
            alert("Something is wrong!");
    }
}

// This function converts number (1, 2, 3) to string ('Rock', 'Paper', 'Scissors')
function convertSelection(selection) {
    return (
        selection === 1 ? ROCK
            : selection === 2 ? PAPER
                : SCISSORS
    );
}

// This function show the final result of the game
function showFinalResult(playerScores, computerScores) {
    let finalResult;

    if (playerScores < computerScores) {
        finalResult = "You lost!"
    } else if (playerScores > computerScores) {
        finalResult = "You win!"
    } else {
        finalResult = "Tied game!"
    }

    alert(`You win ${playerScores} ${playerScores === 1 ? 'round' : 'rounds'}. 
Computer wins ${computerScores} ${computerScores === 1 ? 'round' : 'rounds'}.
=> ${finalResult}`)
}