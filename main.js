let playerScores = 0;
let computerScores = 0;
let rounds = 1;

// while(rounds <= 5) {
//     let computerSelection = computerPlay();
//     let playerSelection = getInput();



//     rounds++;
// }

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

// This function decide the result of each round.
function decideRoundResult(playerSelection, computerSelection) {
    if (
        computerSelection > playerSelection 
        || computerSelection === 1 && playerSelection === 3
    ) {
        return -1;   // the player lost

    } else if (
        computerSelection < playerSelection 
        || playerSelection === 1 && computerSelection === 3
    ) {
        return 1;   // the player won

    } else {
        return 0;   // a tie
    }
}