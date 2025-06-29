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
  let gameTimer = null;
  let moleTimer = null;
  let timer = null; // For countdown timer interval

  // Utility function to get a random integer in range
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Set the delay based on difficulty
  function setDelay(difficulty) {
    if (difficulty === "easy") return 1500;
    if (difficulty === "normal") return 1000;
    if (difficulty === "hard") return randomInteger(600, 1200);
    return 1000; // default fallback
  }

  // Choose a random hole, making sure it's not the same as the last one
  function chooseHole(holes) {
    const index = randomInteger(0, holes.length - 1);
    const hole = holes[index];
    if (hole === lastHole) {
      return chooseHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  // Toggle mole visibility
  function toggleVisibility(hole) {
    hole.classList.toggle("show");
    return hole;
  }

  // Show mole and hide it after delay
  function showAndHide(hole, delay) {
    toggleVisibility(hole); // Show mole

    const timeoutID = setTimeout(() => {
      toggleVisibility(hole); // Hide mole
      gameOver(); // Continue or stop game
    }, delay);

    return timeoutID;
  }

  // Show mole on a hole with delay based on difficulty
  function showUp() {
    const difficulty = difficultySelector.value;
    const delay = setDelay(difficulty);
    const hole = chooseHole(holes);
    return showAndHide(hole, delay);
  }

  // Update the timer display and countdown time
  function updateTimer() {
    if (time > 0) {
      time -= 1;
      timerDisplay.textContent = time;
    }
    return time;
  }

  // Start the countdown timer interval
  function startTimer() {
    timer = setInterval(updateTimer, 1000);
    return timer;
  }

  // Check if game should continue or stop
  function gameOver() {
    if (time > 0) {
      return showUp();
    } else {
      return stopGame();
    }
  }

  // Stop the game and clear timers
  function stopGame() {
    holes.forEach(hole => hole.classList.remove("show"));
    if (timer) clearInterval(timer);
    if (moleTimer) clearTimeout(moleTimer);
    if (gameTimer) clearInterval(gameTimer);
    alert(`Game over! Your score is ${score}`);
    return "game stopped";
  }

  // Start game logic
  function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    time = 10;
    timerDisplay.textContent = time;

    if (moleTimer) clearTimeout(moleTimer);
    if (gameTimer) clearInterval(gameTimer);
    if (timer) clearInterval(timer);

    // Start countdown timer
    startTimer();

    // Also set a gameTimer if needed (e.g., for other purposes)
    gameTimer = setInterval(() => {
      // Optional additional game timing logic here
    }, 1000);

    showUp();

    return "game started";
  }

  // Whack mole event handler
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

  // Attach event listeners to moles and start button
  moles.forEach(mole => mole.addEventListener("click", whack));
  startButton.addEventListener("click", startGame);
});
