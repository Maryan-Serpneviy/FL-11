'use strict';

let continueGame;
let randomMaxRange = 8;
let attempts;
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
        attempts = 3;
        let randomNumber = 1;
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
                randomMaxRange += 4;
                prizeMultiplier *= 2;
                maxPrize = 100 * prizeMultiplier;
                alert(`Congratulation, you won! Your prize is: ${prize}$`);
                break;
            } else if (userGuess !== randomNumber || isNaN(userGuess) ||
                userGuess < 0 || userGuess > randomMaxRange) {
                attempts--;
                maxPrize /= 2;

                if (attempts === 0) {
                    randomMaxRange = 8;
                    maxPrize = 100;
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