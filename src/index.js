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
    if (difficulty === "easy") return
