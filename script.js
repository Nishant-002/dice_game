"use script";
const activeAnimation0 = document.querySelector(".player--0");
const activeAnimation1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

//Things shows in starting

let scores, conditions, currentScore, activePlayer;
const init = function () {
  // Boolean values
  conditions = true;
  currentScore = 0;
  activePlayer = 0;
  // Inital Parameters value
  scores = [0, 0];
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  // Addition and removal of active classes
  dice.classList.add("hidden");
  activeAnimation0.classList.add("player--active");
  activeAnimation1.classList.remove("player--active");
  activeAnimation0.classList.remove("player--winner");
  activeAnimation1.classList.remove("player--winner");
};
init(); // Calling of the init function as soon as page is reloaded
const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //before switching did current score of playing player is zero.
  activePlayer = activePlayer === 0 ? 1 : 0;
  activeAnimation0.classList.toggle("player--active");
  activeAnimation1.classList.toggle("player--active");
};
// Rolling of the dice
btnRoll.addEventListener("click", function () {
  // 1.Random Rolling
  if (conditions) {
    const number = Math.trunc(Math.random() * 6) + 1;
    console.log(number);
    // 2.Display the Random rolled number
    dice.classList.remove("hidden");
    dice.src = `dice-${number}.png`;
    // 3. Checking the condition
    if (number !== 1) {
      currentScore += number;
      // current0.textContent = currentScore; // Changed later and stored in the Played score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // if the rolled dice is 1 then change the turn
    else {
      swtichPlayer();
    }
  }
});

//******Holding Button******* */
btnHold.addEventListener("click", function () {
  if (conditions) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      conditions = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // document.getElementById(`name--${activePlayer}`).textContent =
      //   "🤩🤩YOU WON THE GAME🎉🎉";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      dice.classList.add("hidden");
    } else {
      swtichPlayer();
    }
  }
});

// reseting of the game on clicking on the NEW GAME button

btnNew.addEventListener(
  "click",
  init
); /*init is called as function as player hit the new game button*/
