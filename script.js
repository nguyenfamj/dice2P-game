'use strict';

// Select the element
let scoreEl, currentScoreEl;

const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const rollDiceEl = document.querySelector('.btn--roll');
const holdBtnEl = document.querySelector('.btn--hold');
const newGameBtnEl = document.querySelector('.btn--new');

// Game beginning
let scores, currentScore, currentPlayer, gameEnabled;
resetGame();

// Dice Manipulation
rollDiceEl.addEventListener('click', function () {
  if (gameEnabled == true) {
    // Check for current player and score
    currentScoreEl = chooseCurrentScoreEl(currentPlayer);

    // Random dice
    let dice = generateRandomDice();
    console.log(dice);

    // Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // Game logic
    if (dice === 1) {
      currentScore = 0;
      switchPlayer();
    } else {
      currentScore += dice;
    }
    currentScoreEl.textContent = currentScore;
  }
});

// // Hold button handling
holdBtnEl.addEventListener('click', function () {
  if (gameEnabled === true) {
    // Check the current player
    scoreEl = chooseScoreEl(currentPlayer);
    currentScoreEl = document.getElementById(`current--${currentPlayer}`);

    // Display the score after holding
    scores[currentPlayer] += currentScore;
    scoreEl.textContent = scores[currentPlayer];
    currentScoreEl.textContent = 0;
    currentScore = 0;

    // Winner Declaration ( score >= 100 ) or Switch Player
    if (scores[currentPlayer] >= 100) {
      // Finish game condition
      gameEnabled = false;
      diceEl.classList.add('hidden');

      // Display the winner
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Restart the game
newGameBtnEl.addEventListener('click', resetGame);

// Support functions
function generateRandomDice() {
  return Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
}

function chooseCurrentScoreEl(playerID) {
  return document.getElementById(`current--${playerID}`);
}

function chooseScoreEl(playerID) {
  return document.getElementById(`score--${playerID}`);
}

function resetGame() {
  // Reset the player scores
  scores = [0, 0];
  chooseScoreEl(0).textContent = scores[0];
  chooseScoreEl(1).textContent = scores[1];

  currentScore = 0;
  chooseCurrentScoreEl(0).textContent = 0;
  chooseCurrentScoreEl(1).textContent = 0;

  // Reset the order of player turn (start with player 1)
  currentPlayer = 0;
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');

  // Undisplay the dice
  diceEl.classList.add('hidden');

  // Function to be normal
  gameEnabled = true;
}
