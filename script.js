let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let timeLeft = 30;
let speed = 1000; // Default speed
let gameLoop;
let countdown;

const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const timerDisplay = document.getElementById("timer");
const clickSound = document.getElementById("clickSound");
const difficultySelect = document.getElementById("difficulty");

highScoreDisplay.textContent = highScore;

// Function to move the box randomly
function moveBox() {
    let maxX = gameArea.clientWidth - box.clientWidth;
    let maxY = gameArea.clientHeight - box.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
    box.style.backgroundColor = getRandomColor(); // Change color
}

// Function to generate random colors
function getRandomColor() {
    const colors = ["red", "blue", "green", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to start the countdown timer
function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Function to update high score
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = highScore;
        alert("New High Score: " + highScore);
    }
}

// Function to handle game over
function endGame() {
    clearInterval(gameLoop);
    clearInterval(countdown);
    updateHighScore();
    alert("Game Over! Your final score is: " + score);
}

// Function to start the game
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    speed = parseInt(difficultySelect.value);

    clearInterval(gameLoop);
    clearInterval(countdown);

    startTimer();
    gameLoop = setInterval(moveBox, speed);
}

// Click event for catching the box
box.addEventListener("click", function () {
    clickSound.play(); // Play sound on click
    score++;
    scoreDisplay.textContent = score;

    // Increase speed every 5 points
    if (score % 5 === 0 && speed > 300) {
        speed -= 100;
        clearInterval(gameLoop);
        gameLoop = setInterval(moveBox, speed);
    }

    moveBox();
});
