const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");

const numBallsInput = document.getElementById("numBalls");
const numBallsValue = document.getElementById("numBallsValue");
const distanceInput = document.getElementById("distance");
const distanceValue = document.getElementById("distanceValue");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let balls = [];
let animationFrameId;
let isRunning = false;

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;


numBallsInput.addEventListener('input', () => {
    numBallsValue.textContent = numBallsInput.value;
    resetSimulation();
});
distanceInput.addEventListener('input', () => {
    distanceValue.textContent = distanceInput.value;
    resetSimulation();
});

class Ball {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 10 + Math.random() * 5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = 'rgb(0, 0, 0)';
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    checkCollision(otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const threshold = (canvas.width * distanceInput.value) / 100;

        if (distance < threshold) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(otherBall.x, otherBall.y);
            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
            ctx.stroke();
        }
    }
}

function createBalls() {
    balls = [];
    for (let i = 0; i < numBallsInput.value; i++) {
        balls.push(new Ball());
    }
}

function startAnimation() {
    isRunning = true;
    animate();
}

function stopAnimation() {
    isRunning = false;
    cancelAnimationFrame(animationFrameId);
}

function resetSimulation() {
    stopAnimation();
    createBalls();
    draw();
    startAnimation();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.move();
        ball.draw();
    });

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            balls[i].checkCollision(balls[j]);
        }
    }

    if (isRunning) {
        animationFrameId = requestAnimationFrame(animate);
    }
}

startBtn.addEventListener('click', () => {
    createBalls();
    startAnimation();
});

resetBtn.addEventListener('click', resetSimulation);

createBalls();
draw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.draw());
}
