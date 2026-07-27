// Step 1: Variables for time and status
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null; // Stores the setInterval reference
let lapCount = 0; // Stores total laps count

// Step 2: Select HTML elements by ID
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");
const lapCounter = document.getElementById("lapCounter");

// Helper function 
function formatTime(unit) {
    if (unit < 10) {
        return "0" + unit;
    }
    return unit;
}

// Update the time
function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    } 

    // Display time 
    display.textContent = 
        formatTime(hours) + ":" + 
        formatTime(minutes) + ":" + 
        formatTime(seconds);
}

// 1. Start Button
startBtn.addEventListener("click", function () {
    if (timer === null) {
        timer = setInterval(updateTime, 1000);
    }
});

// 2. Stop Button
stopBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
});

// 3. Lap Button
lapBtn.addEventListener("click", function () {
    if (seconds > 0 || minutes > 0 || hours > 0) {
        lapCount++;
        lapCounter.textContent = lapCount;

        // Create new list item for the lap with formatted spans
        const li = document.createElement("li");
        li.innerHTML = `<span class="lap-number">Lap ${lapCount}</span><span class="lap-time">${display.textContent}</span>`;
        lapsList.prepend(li);
    }
});

// 4. Reset Button
resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;

    seconds = 0;
    minutes = 0;
    hours = 0;

    display.textContent = "00:00:00";
    lapCount = 0;
    lapCounter.textContent = "0";
    lapsList.innerHTML = "";
});
