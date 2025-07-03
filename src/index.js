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

  // Utility: random integer between min and max (inclusive)
  function randomInteger(min, max) {
    return Math.floor(Ma
