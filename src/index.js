document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const startButton = document.querySelector("#start");
  const scoreDisplay = document.querySelector("#score");
  const timerDisplay = document.querySelector("#timer");
  const difficultySelector = document.querySelector("#difficulty");

  let lastHole = null;
  let time = 10;
  let score = 0;
  let moleTimer = null;
  let timer = null;
  let gameInProgress = false;

  // Utility: random integer between min and max (inclusive)
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Set mole visibility delay based on difficulty
  function setDelay(difficulty) {
    switch (difficulty) {
      case "easy": return 1500;
      case "normal": return 1000;
      case "hard": return randomInteger(600, 1200);
      default: return 1000;
    }
  }

  // Choose a random hole, different from the last one
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

  // Show a mole in a hole, handle scoring, and hide it after delay
  function showAndHide() {
    const difficulty = difficultySelector.value;
    const delay = setDelay(difficulty);
    const hole = chooseHole();
    const mole = hole.querySelector(".mole");

    hole.classList.add("show");

    // One-time click handler
    function handleClick() {
      if (!hole.classList.contains("show")) return;

      score++;
      scoreDisplay.textContent = score;

      // Hit animation
      mole.classList.add("hit");
      setTimeout(() => mole.classList.remove("hit"), 150);

      hole.classList.remove("show");
      mole.removeEventListener("click", handleClick);
    }

    mole.addEventListener("click", handleClick);

    moleTimer = setTimeout(() => {
      hole.classList.remove("show");
      mole.removeEventListener("click", handleClick);

      if (gameInProgress && time > 0) {
        showAndHide();
      }
    }, delay);
  }

  // Countdown handler
  function updateTimer() {
    if (time > 0) {
      time--;
      timerDisplay.textContent = time;
    } else {
      endGame();
    }
  }

  // Start the countdown timer
  function startTimer() {
    timerDisplay.textContent = time;
    timer = setInterval(updateTimer, 1000);
  }

  // Start game
  function startGame() {
    if (gameInProgress) return; // Prevent double starts

    gameInProgress = true;
    startButton.disabled = true;  // Disable start button during game

    score = 0;
    time = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;

    clearInterval(timer);
    clearTimeout(moleTimer);

    startTimer();
    showAndHide();
  }

  // End game logic
  function endGame() {
    gameInProgress = false;
    clearInterval(timer);
    clearTimeout(moleTimer);

    // Hide any visible mole
    holes.forEach(hole => hole.classList.remove("show"));
    startButton.disabled = false;  // Re-enable start button

    alert(`Game over! Your score is ${score}`);
  }

  // Button listener
  startButton.addEventListener("click", startGame);
});
