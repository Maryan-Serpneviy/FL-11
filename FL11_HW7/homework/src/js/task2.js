'use strict';

const RANGE_START = 8;
const RANGE_INCREMENT = 4;
const PRIZE_START = 100;
const PRIZE_INCREMENT = 2;
let continueGame;
let randomMaxRange = 8;
let prize = 0;
let prizeTotal = 0;
let maxPrize = 100;
let prizeMultiplier = 1;
let playGame = confirm('Do you want to play a game?');

if (!playGame) {
    alert('You did not become a billionaire, but can.');
} else {
    do {
        let attempts = 3;
        let randomNumber = Math.round(Math.random() * randomMaxRange);
        console.log(randomNumber);
        do {
            let userGuess = parseInt(prompt(
                `Choose a roulette pocket number from 0 to ${randomMaxRange}
Attempts left: ${attempts}
Total prize: ${prizeTotal}$
Possible prize on current attempt: ${maxPrize}$
`
            ));
            if (userGuess === randomNumber) {
                prize = maxPrize;
                prizeTotal += prize;
                randomMaxRange += RANGE_INCREMENT;
                prizeMultiplier *= PRIZE_INCREMENT;
                maxPrize = PRIZE_START * prizeMultiplier;
                alert(`Congratulation, you won! Your prize is: ${prize}$`);
                break;
            } else if (userGuess !== randomNumber || isNaN(userGuess) ||
                userGuess < 0 || userGuess > randomMaxRange) {
                attempts--;
                maxPrize /= PRIZE_INCREMENT;

                if (attempts === 0) {
                    randomMaxRange = RANGE_START;
                    maxPrize = PRIZE_START;
                    prizeMultiplier = 1;
                    alert(`Thank you for your participation. Your prize is: ${prizeTotal}$`);
                    prizeTotal = 0;
                }
            }
        } while (attempts > 0)
        continueGame = confirm('Do you want to continue?');
        if (!continueGame) {
            alert('You did not become a billionaire, but can.');
        }
    } while (continueGame)
}