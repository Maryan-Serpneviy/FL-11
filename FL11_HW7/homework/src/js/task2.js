'use strict';

const STARTING_RANGE = 8;
const RANGE_INCREMENT = 4;
const STARTING_PRIZE = 100;
const PRIZE_MULTIPLIER = 2;
let continueGame;
let randomMaxRange = 8;
let prize = 0;
let prizeTotal = 0;
let maxPrize = 100;
let prizeMultiplier = 1;
let randomNumber = Math.floor(Math.random() * (randomMaxRange + 1));
let playGame = confirm('Do you want to play a game?');

if (!playGame) {
    alert('You did not become a billionaire, but can.');
} else {
    do {
        let randomNumber = 1;
        let attempts = 3;
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
                prizeMultiplier *= PRIZE_MULTIPLIER;
                maxPrize *= prizeMultiplier;
                alert(`Congratulation, you won! Your prize is: ${prize}$`);
                break;
            } else if (userGuess !== randomNumber || isNaN(userGuess) ||
                userGuess < 0 || userGuess > randomMaxRange) {
                attempts--;
                maxPrize /= PRIZE_MULTIPLIER;

                if (attempts === 0) {
                    randomMaxRange = STARTING_RANGE;
                    maxPrize = STARTING_PRIZE;
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