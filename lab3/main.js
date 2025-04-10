const main = document.querySelector(".main");
const controlsContainer = document.createElement("div");
controlsContainer.classList.add("controls");
document.body.appendChild(controlsContainer);

const NUM_CHANNELS = 4;
const BPM = 500;
const sounds = {
    a: document.querySelector(".clap"),
    s: document.querySelector(".kick"),
    d: document.querySelector(".hihat"),
    w: document.querySelector(".snare"),
    metronome: document.querySelector(".metronome"),
};

const channels = Array.from({ length: NUM_CHANNELS }, () => []);
const isRecording = Array(NUM_CHANNELS).fill(false);
const startTimes = Array(NUM_CHANNELS).fill(0);
let metronomeInterval = null;

function playSound(sound) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
}

function startRecording(channelId) {
    channels[channelId] = [];
    startTimes[channelId] = Date.now();
    isRecording[channelId] = true;
}

function stopRecording(channelId) {
    isRecording[channelId] = false;
}

function playChannel(channelId) {
    channels[channelId].forEach(({ key, time }) => {
        setTimeout(() => playSound(sounds[key]), time);
    });
}

function playAllChannels() {
    channels.forEach((_, index) => playChannel(index));
}

function startMetronome() {
    if (!metronomeInterval) {
        metronomeInterval = setInterval(() => {
            playSound(sounds.metronome);
        }, BPM);
    }
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    metronomeInterval = null;
}

function createChannelControls(channelId) {
    const container = document.createElement("div");
    container.classList.add("channel");

    const recordBtn = createButton(`Start Recording ${channelId + 1}`, () => startRecording(channelId));
    const stopBtn = createButton(`Stop Recording ${channelId + 1}`, () => stopRecording(channelId));
    const playBtn = createButton(`Play Channel ${channelId + 1}`, () => playChannel(channelId));

    container.append(recordBtn, stopBtn, playBtn);
    controlsContainer.appendChild(container);
}

function createMainControls() {
    const mainControls = document.createElement("div");
    mainControls.classList.add("main-controls");

    const playAllBtn = createButton("Play All Channels", playAllChannels);
    playAllBtn.id = "all";

    const startMetronomeBtn = createButton("Start Metronome", startMetronome);
    startMetronomeBtn.id = "startMetronom";

    const stopMetronomeBtn = createButton("Stop Metronome", stopMetronome);
    stopMetronomeBtn.id = "stopMetronom";

    mainControls.append(playAllBtn, startMetronomeBtn, stopMetronomeBtn);
    main.appendChild(mainControls);
}

function createButton(label, onClick) {
    const button = document.createElement("button");
    button.innerText = label;
    button.onclick = onClick;
    return button;
}

document.addEventListener("keypress", (event) => {
    const sound = sounds[event.key];
    if (!sound) return;

    playSound(sound);

    isRecording.forEach((recording, index) => {
        if (recording) {
            channels[index].push({
                key: event.key,
                time: Date.now() - startTimes[index],
            });
        }
    });
});

Array.from({ length: NUM_CHANNELS }, (_, i) => createChannelControls(i));
createMainControls();