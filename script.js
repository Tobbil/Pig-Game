'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;

	score0El.textContent = 0;
	score1El.textContent = 0;
	currentScore0El.textContent = 0;
	currentScore1El.textContent = 0;

	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
	dice.classList.add('hidden');

	playing = true;
};

init();

btnRoll.addEventListener('click', function () {
	if (playing) {
		const randomNum = Math.trunc(Math.random() * 6) + 1;
		dice.classList.remove('hidden');
		dice.src = `dice/dice-${randomNum}.png`;

		if (randomNum === 1) {
			currentScore = 0;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
			activePlayer = activePlayer === 0 ? 1 : 0;
			player0El.classList.toggle('player--active');
			player1El.classList.toggle('player--active');
			console.log(`Active player: ${activePlayer}`);
		} else {
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
		if (activePlayer === 0) {
			score0El.textContent = 'WINS!';
			player0El.classList.add('player--winner');
			playing = false;
			dice.classList.add('hidden');
		} else {
			score1El.textContent = 'WINS!';
			player1El.classList.add('player--winner');
			playing = false;
			dice.classList.add('hidden');
		}
	} else {
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
		if (activePlayer === 0) score0El.textContent = scores[0];
		else score1El.textContent = scores[1];
		activePlayer = activePlayer === 0 ? 1 : 0;
		player0El.classList.toggle('player--active');
		player1El.classList.toggle('player--active');
	}
});

btnNew.addEventListener('click', function () {
	init();
});
