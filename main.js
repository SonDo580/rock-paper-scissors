const WON = 'WON';
const LOST = 'LOST';
const TIED = 'TIED';
const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', playRound));

const resultDiv = document.querySelector('#result');

let playerScores = 0;
let computerScores = 0;

function playRound(e) {
    let playerSelection = e.target.textContent;
    let computerSelection = computerPlay();

    resultDiv.textContent = showRoundResult(playerSelection, computerSelection);

    // Update the score
    switch (decideRoundResult(playerSelection, computerSelection)) {
        case WON:    
            playerScores++;
            break;
        case LOST:    
            computerScores++;
            break;
        case TIED:    
            break;
        default:
            alert("Something is wrong!");
    }

    if (playerScores === 5 || computerScores === 5) {
        // Announce the winner

        // Ask if the player want to play again

    }
}

// This function randomly returns 'Rock', 'Paper', or 'Scissors'
function computerPlay() {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    let computerSelection = getRandomInt(1, 3);

    return convertSelection(computerSelection);
}

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

function showRoundResult(playerSelection, computerSelection) {
    let result = decideRoundResult(playerSelection, computerSelection);

    switch (result) {
        case LOST:
            return `You lost this round! ${computerSelection} beats ${playerSelection}`;
            break;
        case WON:
            return `You won this round! ${playerSelection} beats ${computerSelection}`;
            break;
        case TIED:
            return "Tied match!";
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

function showFinalResult(playerScores, computerScores) {
    if (playerScores < computerScores) {
        return "You lost!"
    } else if (playerScores > computerScores) {
        return "You win!"
    } else {
        return "Tied game!"
    }
}

// while (true) {
//     let playerScores = 0;
//     let computerScores = 0;
//     let canceled = false;   

//     while (true) {
//         let computerSelection = computerPlay();
//         let playerSelection = getInput(rounds);
        
//         if (playerSelection === null) {
//             canceled = true;
//             break;
//         } else {
//             printRoundResult(playerSelection, computerSelection);

//             // Update the score
//             switch (decideRoundResult(playerSelection, computerSelection)) {
//                 case WON:    
//                     playerScores++;
//                     break;
//                 case LOST:    
//                     computerScores++;
//                     break;
//                 case TIED:    
//                     break;
//                 default:
//                     alert("Something is wrong!");
//             }
//         }
//     }
    
//     if (canceled) {     
//         alert("You canceled the game!");
//         break;
//     }

//     showFinalResult(playerScores, computerScores);

//     if (!confirm("Do you want to play again?")) {
//         alert("You canceled the game!");
//         break;
//     }
// }





