document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const moles = document.querySelectorAll(".mole");
  const startButton = document.querySelector("#start");
  const scoreDisplay = document.querySelector("#score");
  const timerDisplay = document.querySelector("#timer");
  const difficultySelector = document.querySelector("#difficulty");

  let lastHole = null;
  let time = 10;
  let score = 0;
  let moleTimer = null;
  let timer = null;

  // Utility: random integer between min and max (inclusive)
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Set mole visibility delay by difficulty
  function setDelay(difficulty) {
    if (difficulty === "easy") return 1500;
    if (difficulty === "normal") return 1000;
    if (difficulty === "hard") return randomInteger(600, 1200);
    return 1000;
  }

  // Choose a hole different from the last one
  function chooseHole() {
    let index;
    let hole;
    do {
      index = randomInteger(0, holes.length - 1);
      hole = holes[index];
    } while (hole === lastHole);
    lastHole = hole;
    return hole;
  }

  // Show mole on chosen hole for delay then hide and call next mole
  function showAndHide() {
    const difficulty = difficultySelector.value;
    const delay = setDelay(difficulty);
    const hole = chooseHole();

    hole.classList.add("show");

    moleTimer = setTimeout(() => {
      hole.classList.remove("show");
      if (time > 0) {
        showAndHide();
      }
    }, delay);
  }

  // Update timer display each second
  function updateTimer() {
    if (time > 0) {
      time--;
      timerDisplay.textContent = time;
    } else {
      clearInterval(timer);
      clearTimeout(moleTimer);
      alert(`Game over! Your score is ${score}`);
    }
  }

  // Start countdown timer
  function startTimer() {
    timerDisplay.textContent = time;
    timer = setInterval(updateTimer, 1000);
  }

  // Start the game
  function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    time = 10;
    timerDisplay.textContent = time;

    clearInterval(timer);
    clearTimeout(moleTimer);

    startTimer();
    showAndHide();
  }

  // Handle mole clicks
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

  // Attach event listeners
  moles.forEach(mole => mole.addEventListener("click", whack));
  startButton.addEventListener("click", startGame);
});
