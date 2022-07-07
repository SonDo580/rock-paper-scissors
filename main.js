while (true) {
    let playerScores = 0;
    let computerScores = 0;
    let rounds = 1;
    let canceled = false;

    // Define constant
    const WON = 'WON';
    const LOST = 'LOST';
    const TIED = 'TIED';
    
    const ROCK = 'ROCK';
    const PAPER = 'PAPER';
    const SCISSORS = 'SCISSORS';

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
        // end round

        rounds++;
    }

    // This is when the player cancels in the middle of the game
    if(canceled) {
        alert("You canceled the game!");
        break;
    }

    showFinalResult(playerScores, computerScores);

    if (!confirm("Do you want to play again?")) {
        alert("You canceled the game!");
        break;
    }
}


// This function randomly return 1, 2, or 3 (corresponds to Rock, Paper, Scissor)
function computerPlay() {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    return getRandomInt(1, 3);
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
            return +choice;     // convert the choice to number
        } else if (choice === null) {
            return choice;
        } else {
            alert("You should press 1, 2, or 3");
        }
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

// This function show the final result of the game
function showFinalResult(playerScores, computerScores) {
    let result;

    if (playerScores < computerScores) {
        result = "You lost!"
    } else if (playerScores > computerScores) {
        result = "You win!"
    } else {
        result = "Tied game!"
    }

    alert(`You win ${playerScores} ${playerScores === 1 ? 'round' : 'rounds'}. 
Computer wins ${computerScores} ${computerScores === 1 ? 'round' : 'rounds'}.
=> ${result}`)
}