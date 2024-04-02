"use strict";

const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, currentScore, activePlayer, playing;

const init = function () {
  //Starting condition
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("plyer--active");
  diceElement.classList.add("hidden");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};
//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1) Generating a random Dice Roll.
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2) Display Dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${diceNumber}.png`;

    // 3) Checked for rolled 1: if true switch to next player
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //currentScore0El.textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player's score.
    score[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore.
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //Check if player's score is >= 100.
    if (score[activePlayer] >= 30) {
      // FInish the game.
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
