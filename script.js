'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // ID tak
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.toggle('hidden');

// Stored values
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling the dice
btnRoll.addEventListener('click', function () {
	if (scores[0] < 100 && scores[1] < 100) {
		// Generating random dice roll
		const randomNum = Math.trunc(Math.random() * 6) + 1;
		// Display the dice
		dice.classList.remove('hidden');
		dice.src = `dice-${randomNum}.png`;

		if (randomNum === 1) {
			// Set current score to 0
			currentScore = 0;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
			// Switch to next player
			activePlayer = activePlayer === 0 ? 1 : 0;
			player0El.classList.toggle('player--active');
			player1El.classList.toggle('player--active');
			console.log(`Active player: ${activePlayer}`);
		} else {
			// Add dice to current score
			currentScore += randomNum;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		}
	}
});

btnHold.addEventListener('click', function () {
	scores[activePlayer] += currentScore;
	currentScore = 0;
	if (scores[activePlayer] >= 100) {
		if (activePlayer === 0) score0El.textContent = `WINS!`;
		else score1El.textContent = `WINS!`;
	} else {
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
		if (activePlayer === 0) score0El.textContent = scores[0];
		else score1El.textContent = scores[1];
		activePlayer = activePlayer === 0 ? 1 : 0;
	}
	console.log(scores);
});

btnNew.addEventListener('click', function () {
	scores[0] = 0;
	scores[1] = 0;
	score0El.textContent = 0;
	score1El.textContent = 0;
	currentScore = 0;
	activePlayer = 0;
	currentScore0El.textContent = 0;
	currentScore1El.textContent = 0;
	dice.classList.toggle('hidden');
});
