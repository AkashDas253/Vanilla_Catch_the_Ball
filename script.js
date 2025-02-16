let score = 0;
let speed = 1000; // Initial move time in milliseconds

const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("gameArea");

function moveBox() {
    let maxX = gameArea.clientWidth - box.clientWidth;
    let maxY = gameArea.clientHeight - box.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
}

// Click event to increase score
box.addEventListener("click", function () {
    score++;
    scoreDisplay.textContent = score;

    // Increase speed every 5 points
    if (score % 5 === 0 && speed > 300) {
        speed -= 100;
    }

    moveBox();
});

// Move the box at intervals
setInterval(moveBox, speed);
