const kick = document.querySelector("#kick");
const clap = document.querySelector("#clap");
const hihat = document.querySelector("#hihat");
const snare = document.querySelector("#snare");

const keysToSound = {
    a: clap,
    s: kick,
    d: hihat,
    w: snare
}

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play;
}

document.addEventListener("keydown", (e) => {
    playSound(keysToSound[e.key]);
})