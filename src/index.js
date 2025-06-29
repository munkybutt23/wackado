document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const moles = document.querySelectorAll(".mole");
  const startButton = document.querySelector("#start");
  const scoreDisplay = document.querySelector("#score");
  const timerDisplay = document.querySelector("#timer");
  const difficultySelector = document.querySelector("#difficulty");

  let lastHole = null;
  let time = 10; // Game duration in seconds
  let score = 0;
  let timerInterval = null;
  let moleTimeout = null;

  // Utility: get random integer inclusive
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Pick a hole randomly that’s not the same as last
  function chooseHole() {
    let idx;
    let hole;
    do {
      idx = randomInteger(0, holes.length - 1);
      hole = holes[idx];
    } while (hole === lastHole);
    lastHole = hole;
    return hole;
  }

  // Determine mole visible duration by difficulty
  function getDelay() {
    const difficulty = difficultySelector.value;
    if (difficulty === "easy") return 1500;
    if (difficulty === "normal") return 1000;
    if (difficulty === "hard") return randomInteger(600, 1200);
    return 1000;
  }

  // Show mole in hole, then hide after delay, then show next mole
  function showMole() {
    if (time <= 0) return; // Stop if game over

    const hole = chooseHole();
    hole.classList.add("show");

    const delay = getDelay();

    moleTimeout = setTimeout(() => {
      hole.classList.remove("show");
      showMole(); // Show next mole recursively
    }, delay);
  }

  // Update timer display and decrease time every second
  function updateTimer() {
    if (time > 0) {
      time--;
      timerDisplay.textContent = time;
    } else {
      stopGame();
    }
  }

  // Start countdown timer interval
  function startTimer() {
    timerDisplay.textContent = time;
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Stop game: clear intervals and timeouts, hide moles, alert final score
  function stopGame() {
    clearInterval(timerInterval);
    clearTimeout(moleTimeout);
    holes.forEach(hole => hole.classList.remove("show"));
    alert(`Game over! Your score is ${score}`);
  }

  // Reset score to zero and update display
  function resetScore() {
    score = 0;
    scoreDisplay.textContent = score;
  }

  // Handle mole clicks: increase score, update display, hide mole, animate hit
  function whack(event) {
    if (!event.target.classList.contains("mole")) return;
    if (!event.target.parentElement.classList.contains("show")) return;

    score++;
    scoreDisplay.textContent = score;

    event.target.parentElement.classList.remove("show");

    // Hit animation
    event.target.classList.add("hit");
    setTimeout(() => event.target.classList.remove("hit"), 150);
  }

  // Start game handler: reset everything, start timer and mole appearances
  function startGame() {
    resetScore();
    time = 10;
    timerDisplay.textContent = time;

    clearInterval(timerInterval);
    clearTimeout(moleTimeout);

    startTimer();
    showMole();
  }

  // Attach event listeners
  moles.forEach(mole => mole.addEventListener("click", whack));
  startButton.addEventListener("click", startGame);
});
