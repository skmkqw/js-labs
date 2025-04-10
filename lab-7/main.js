const ball = document.getElementById("ball");

if (window.DeviceOrientationEvent) {
    window.addEventListener(
        "deviceorientation",
        (event) => {
        const rotateDegrees = event.alpha;
        const leftToRight = event.gamma;
        const frontToBack = event.beta;

        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
        },
        true,
    );
}

const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => {
    console.log(rotateDegrees);
    ball.style.top = frontToBack * 2 + "px";
    ball.style.left = leftToRight * 2 + "px";
};