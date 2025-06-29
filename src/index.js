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

  // Show mole and hide
