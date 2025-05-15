const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const highScoreEl = document.getElementById('highscore');

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

let x = gameWidth / 2;
let y = gameHeight / 2;
let vx = 0, vy = 0;

const ballRadius = 20;
const holeRadius = 30;

let score = 0;
let highScore = localStorage.getItem('ball_game_highscore') || 0;
highScoreEl.textContent = highScore;

function placeHole() {
    const x = Math.random() * (gameWidth - holeRadius * 2);
    const y = Math.random() * (gameHeight - holeRadius * 2);
    hole.style.left = x + 'px';
    hole.style.top = y + 'px';
}

placeHole();

function updatePosition() {
    x += vx;
    y += vy;

    x = Math.max(0, Math.min(gameWidth - ballRadius * 2, x));
    y = Math.max(0, Math.min(gameHeight - ballRadius * 2, y));

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    checkCollision();
    requestAnimationFrame(updatePosition);
}

function checkCollision() {
    const ballCenterX = x + ballRadius;
    const ballCenterY = y + ballRadius;

    const holeX = parseFloat(hole.style.left) + holeRadius;
    const holeY = parseFloat(hole.style.top) + holeRadius;

    const dx = ballCenterX - holeX;
    const dy = ballCenterY - holeY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < holeRadius - ballRadius) {
        score++;
        scoreEl.textContent = score;
        placeHole();
    }
}

window.addEventListener('deviceorientation', (event) => {
    const { beta, gamma } = event;

    vx = gamma / 50;
    vy = beta / 50;
});

let timeLeft = 60;
const timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        vx = vy = 0;
        alert(`Time's up! Your score: ${score}`);
        if (score > highScore) {
            localStorage.setItem('ball_game_highscore', score);
            highScoreEl.textContent = score;
        }
    }
}, 1000);

updatePosition();