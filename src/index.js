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

  // Show mole and hide it after a delay
  function showAndHide(hole, delay) {
    toggleVisibility(hole); // show

    const timeoutID = setTimeout(() => {
      toggleVisibility(hole); // hide
      gameOver(); // continue or stop
    }, delay);

    return timeoutID;
  }

  // Show a mole with randomized delay and location
  function showUp() {
    const difficulty = difficultySelector.value;
    const delay = setDelay(difficulty);
    const hole = chooseHole(holes);
    return showAndHide(hole, delay);
  }

  // Set game timer duration
  function setDuration(seconds) {
    time = seconds;
    timerDisplay.textContent = time;
  }

  // Handle game stopping logic
  function stopGame() {
    holes.forEach(hole => hole.classList.remove("show"));
    alert(`Game over! Your score is ${score}`);
    return "game stopped";
  }

  // Check if game should continue or stop
  function gameOver() {
    if (time > 0) {
      return showUp();
    } else {
      return stopGame();
    }
  }

  // Start the game
  function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    setDuration(10);

    if (moleTimer) clearTimeout(moleTimer);
    if (gameTimer) clearInterval(gameTimer);

    gameTimer = setInterval(() => {
      time--;
      timerDisplay.textContent = time;
    }, 1000);

    showUp();

    return "game started";
  }

  // Handle mole click / whack
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

  // Event listeners
  moles.forEach(mole => mole.addEventListener("click", whack));
  startButton.addEventListener("click", startGame);
});
