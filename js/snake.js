let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let initialScreen = document.getElementById("initial-screen");
let playButton = document.getElementById("play-button");
let canvasBorder = document.getElementById("game");
let scoreElement = document.getElementById("score");
let highScoreElement = document.getElementById("high-score");
var trophyImage = document.getElementById("trophy");
var appleImage = document.getElementById("apple");

let grid = 16;
let count = 0;
let score = 0;
let snakeSpeed = 10; // Adjust the speed as needed

let end = false;
let showingGameOverScreen = false;

// Retrieve high score from local storage, or set to 0 if not available
let highScore = localStorage.getItem("snakeHighScore") || 0;

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};

let apple = {
  x: 336,
  y: 160,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showGame() {
  initialScreen.style.display = "none";
  canvas.style.display = "block";
}

function loop() {
  requestAnimationFrame(loop);

  if (end) {
    // If the game is over, stop looping
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasBorder.style.border = "0";
    endGame(); // Call endGame function when collision occurs
    return;
  }

  if (++count < snakeSpeed) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = "green";
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score += 10;
      updateScore();

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        updateHighScore();
      }

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        end = true;
      }
    }
  });
}

function updateScore() {
  document.getElementById("score").innerHTML = "Score: " + score;
}

function updateHighScore() {
  document.getElementById("high-score").innerHTML = "High Score: " + highScore;
}

function showGameOverScreen() {
  // Create a div element for the game over screen
  let gameOverScreen = document.createElement("div");
  gameOverScreen.id = "game-over-screen";
  gameOverScreen.classList.add("game-over-screen");

  trophyImage.style.display = "block";

  document.getElementById("high-score").innerHTML = highScore;
  document.getElementById("high-score").style.top = "40%";
  document.getElementById("high-score").style.left = "40%";

  appleImage.style.display = "block";

  document.getElementById("score").innerHTML = score;
  document.getElementById("score").style.top = "40%";
  document.getElementById("score").style.left = "60%";

  // Create and add the play again button
  let playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.addEventListener("click", resetAndStartGame);

  gameOverScreen.appendChild(playAgainButton);

  // Append the game over screen to the body element
  document.body.appendChild(gameOverScreen);
}

function resetAndStartGame() {
  // Remove the game-over screen
  let gameOverScreen = document.getElementById("game-over-screen");
  if (gameOverScreen) {
    gameOverScreen.parentNode.removeChild(gameOverScreen);
  }

  // Reset game variables and start a new game
  resetGame();
  startGame();
}

function endGame() {
  // Stop the game loop
  cancelAnimationFrame(loop);
  //Display the game-over screen
  if (showingGameOverScreen === false) {
    showGameOverScreen();
    showingGameOverScreen = true;
  }
}

function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;

  score = 0;
  updateScore();

  apple.x = 336;
  apple.y = 160;
}

function startGame() {
  showGame();
  updateScore();
  updateHighScore();
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

playButton.addEventListener("click", startGame);
