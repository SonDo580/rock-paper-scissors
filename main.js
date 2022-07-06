let playerScores = 0;
let computerScores = 0;
let rounds = 1;

// This function returns a random integer between "min" and "max" (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);    
}

// This function randomly return 1, 2, or 3 (corresponds to Rock, Paper, Scissor)
function computerPlay() {
    return getRandomInt(1, 3);
}