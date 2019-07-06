let continueGame;

do {
    let playGame = confirm('Do you want to play a game?');
    let randomMaxRange = 8;

    if (!playGame) {
        alert('You did not become a billionaire, but can.');
    } else {
        //let randomNumber = Math.floor(Math.random() * (randomMaxRange + 1));
        let randomNumber = 2;
        let attempts = 3;
        let prize = 100;
        let prizeTotal = 0;
        let userGuess;

        do {
            userGuess = parseInt(prompt(
                `Choose a roulette pocket number from 0 to ${randomMaxRange}
Attempts left: ${attempts}
Total prize: ${prizeTotal}$
Possible prize on current attempt: ${prize}$
`
            ));
            if (userGuess === randomNumber) {
                alert(`Congratulation, you won! Your prize is: ${prize}$`);
                let continueGame = confirm('Do you want to continue?');
                if (!continueGame) {
                    alert(`Thank you for your participation. Your prize is: ${prize}$`);
                    confirm('Play again?');
                } else {
                    randomMaxRange += 4;
                    prizeTotal = prize + prize * 2;
                    attempts = 3;
                }
                break;
            } else {
                attempts--;
                prize = prize / 2;
                if (attempts === 0) {
                    prize = 0;
                    alert(`Thank you for your participation. Your prize is: ${prize}$`);
                    confirm('Play again?');
                }
            }
        } while (attempts > 0);
        continueGame = confirm('play again?');
    }
} while (continueGame === true);