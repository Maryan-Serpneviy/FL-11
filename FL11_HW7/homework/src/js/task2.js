let continueGame;

do {
    let playGame = true;
    let randomMaxRange = 8;
    //let randomNumber = Math.floor(Math.random() * (randomMaxRange + 1));
    let randomNumber = 2;
    let attempts = 3;
    let prize = 100;
    let prizeTotal = 0;
    let userGuess;

    if (!playGame) {
        alert('You did not become a billionaire, but can.');
    } else {
        do {
            let playGame = confirm('Do you want to play a game?');
            if (!playGame) {
                alert('You quit the game');
                break;
            }
            userGuess = parseInt(prompt(
                `Choose a roulette pocket number from 0 to ${randomMaxRange}
Attempts left: ${attempts}
Total prize: ${prizeTotal}$
Possible prize on current attempt: ${prize}$
`
            ));
            if (isNaN(userGuess)) {
                alert('You quit the game');
                prize = 0;
                break;
            } else if (userGuess < 0 || userGuess > randomMaxRange) {
                alert('Out of range. Game aborted');
                prize = 0;
                break;
            } else if (userGuess === randomNumber) {
                alert(`Congratulation, you won! Your prize is: ${prize}$`);
                break;
            } else if (userGuess !== randomNumber) {
                attempts--;
                prize = prize / 2;
                if (attempts === 0) {
                    prize = 0; 
                    alert(`Thank you for your participation. Your prize is: ${prize}$`);
                }
            }
        } while (attempts > 0);
        continueGame = confirm('Do you want to continue?');
        if (!continueGame) {
            alert(`Thank you for your participation. Your prize is: ${prize}$`);
        } else {
            randomMaxRange += 4;
            prizeTotal = prize + prize * 2;
            attempts = 3;
        }
    }
} while (continueGame === true);