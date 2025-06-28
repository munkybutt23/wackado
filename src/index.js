const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = null;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") return 1500;
  if (difficulty === "normal") return 1000;
  if (difficulty === "hard") return randomInteger(600, 1200);
  return 1000; // default fallback
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) return chooseHole(holes);
  lastHole = hole;
  return hole;
}

/**
 * Toggles the visibility (show/hide) of the mole in the hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
}

/**
 * Shows mole in hole and hides after delay.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole); // show mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // hide mole
    gameOver();
  }, delay);
  return timeoutID;
}

/**
 * Calls the showAndHide() function with a specific delay and a hole.
 */
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * Handles game continuation or stopping.
 */
function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

/**
 * Updates the score display and increments points.
 */
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

/**
 * Clears the score.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates timer display and decrements time.
 */
function updateTimer() {
  time--;
  timerDisplay.textContent = time;
  if (time <= 0) {
    stopGame();
  }
  return time;
}

/**
 * Starts the timer interval.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * Stops the game and clears timer.
 */
function stopGame() {
  clearInterval(timer);
  alert(`Game Over! Your final score is ${points}.`);
  return "game stopped";
}

/**
 * Event handler for clicking a mole.
 */
function whack(event) {
  const mole = event.target;
  if (!mole.parentElement.classList.contains('show')) return; // ignore if mole hidden
  updateScore();
  mole.parentElement.classList.remove('show'); // hide mole immediately on hit
}

/**
 * Adds click event listeners to all moles.
 */
function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
}

/**
 * Sets the game duration in seconds.
 */
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

/**
 * Starts the game.
 */
function startGame() {
  clearScore();
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  return "game started";
}

startButton.addEventListener('click', startGame);
