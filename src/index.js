document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const moles = document.querySelectorAll(".mole");
  const startButton = document.querySelector("#start");
  const scoreDisplay = document.querySelector("#score");
  const timerDisplay = document.querySelector("#timer");
  const difficultySelector = document.querySelector("#difficulty");

  let lastHole = null;
  let time = 10; // game duration in seconds
  let score = 0;
  let timerInterval = null;
  let moleTimeout = null;

  // Generate a random integer between min and max inclusive
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Choose a hole randomly but not the same as last time
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

  // Determine mole visible duration based on difficulty
  function getDelay() {
    const difficulty = difficultySelector.value;
    if (difficulty === "easy") return 1500;
    if (difficulty === "normal") return 1000;
    if (difficulty === "hard") return randomInteger(600, 1200);
    return 1000; // default fallback
  }

  // Show mole in a hole and hide after delay
  function showMole() {
    if (time <= 0) return; // stop if game over

    const hole = chooseHole();
    hole.classList.add("show");

    const delay = getDelay();

    moleTimeout = setTimeout(() => {
      hole.classList.remove("show");
      showMole(); // Show another mole
    }, delay);
  }

  // Update timer every second
  function updateTimer() {
    if (time > 0) {
      time--;
      timerDisplay.textContent = time;
    } else {
      stopGame();
    }
  }

  // Start the game timer
  function startTimer() {
    timerDisplay.textContent = time;
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Stop the game and clear intervals/timeouts
  function stopGame() {
    clearInterval(timerInterval);
    clearTimeout(moleTimeout);
    holes.forEach(hole => hole.classList.remove("show"
