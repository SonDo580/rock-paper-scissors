const WON = 'WON';
const LOST = 'LOST';
const TIED = 'TIED';
const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';

let playerScores = 0;
let computerScores = 0;

const resultDiv = document.querySelector('#result');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', playRound));

const playerScoresBox = document.querySelector('.player .score');
const computerScoresBox = document.querySelector('.computer .score');
playerScoresBox.textContent = 0;
computerScoresBox.textContent = 0;

function playRound(e) {
    let button = e.target;
    button.classList.add('choosing');

    let playerSelection = button.textContent;
    let computerSelection = computerPlay();

    resultDiv.textContent = showRoundResult(playerSelection, computerSelection);

    switch (decideRoundResult(playerSelection, computerSelection)) {
        case WON:    
            playerScores++;
            playerScoresBox.textContent = playerScores;
            break;
        case LOST:    
            computerScores++;
            computerScoresBox.textContent = computerScores;
            break;
        case TIED:    
            break;
        default:
            alert("Something is wrong!");
    }

    if (playerScores === 5 || computerScores === 5) {
        resultDiv.textContent = showFinalResult(playerScores, computerScores);

        // Disable the buttons
        buttons.forEach(button => button.disabled = true);

        window.addEventListener('keydown', resetGame, {
            once: true      // so the player won't be reset in the next game when they accidentally press a key
        });
    }
}

function resetGame() {
    playerScores = 0;
    computerScores = 0;
    playerScoresBox.textContent = 0;
    computerScoresBox.textContent = 0;
    resultDiv.textContent = '';

    // Re-activate the buttons
    buttons.forEach(button => button.disabled = false);
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
        return "You lost! Press any key to play again";
    } else if (playerScores > computerScores) {
        return "You won! Press any key to play again";
    }
}
