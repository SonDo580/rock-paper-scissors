let playerScores = 0;
let computerScores = 0;
let rounds = 1;

// This function returns a random integer between "min" and "max" (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);    
}