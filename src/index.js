document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll(".hole");
  const moles = document.querySelectorAll(".mole");
  const startButton = document.querySelector("#start");
  const scoreDisplay = document.querySelector("#score");
  const timerDisplay = document.querySelector("#timer");
  const difficultySelector = document.querySelector("#difficulty");

  let lastHole = null;
  let time = 10; // seconds
  let score = 0;
  let gameTimer = null;
  let moleTimer = null;

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setDelay(difficulty) {
    if (difficulty === "easy") return 1500;
    if (difficulty === "normal") return 1000;
    if (difficulty === "hard") return randomInteger(600, 1200);
    return 1000; // fallback default
  }

  function chooseHole(holes) {
    const index = randomInteger(0, holes.length - 1);
    const hole = holes[index];
    if (hole === lastHole) {
      return chooseHole(holes); // prevent same hole twice
    }
    lastHole = hole;
    return hole;
  }

  function showMole() {
    if (time <= 0) return; // stop showing if time is up

    const hole = chooseHole(holes);
    hole.classList.add("show");

    const difficulty = difficultySelector.value;
    const visibleTime = setDelay(difficulty);

    moleTimer = setTimeout(() => {
      hole.classList.remove("show");
      showMole();
    }, visibleTime);
  }

  function startGame() {
    score = 0;
    time = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;

    if (gameTimer) clearInterval(gameTimer);
    if (moleTimer) clearTimeout(moleTimer);

    showMole();

    gameTimer = setInterval(() => {
      time--;
      timerDisplay.textContent = time;
      if (time <= 0) {
        clearInterval(gameTimer);
        clearTimeout(moleTimer);
        holes.forEach(hole => hole.classList.remove("show"));
        alert(`Game over! Your score is ${score}`);
      }
    }, 1000);
  }

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

  moles.forEach(mole => mole.addEventListener("click", whack));
  startButton.addEventListener("click", startGame);
});
