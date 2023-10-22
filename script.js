let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let isRunning = false;
let lapCount = 1;

function updateTime() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;

        if (seconds >= 60) {
            seconds = 0;
            minutes++;

            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    document.getElementById('display').textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('milliseconds').textContent = `${milliseconds < 100 ? '0' : ''}${milliseconds < 10 ? '0' : ''}${Math.floor(milliseconds / 10)}`;
}

document.getElementById('startBtn').addEventListener('click', function () {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTime, 10);
    }
});

document.getElementById('stopBtn').addEventListener('click', function () {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
    }
});

document.getElementById('resetBtn').addEventListener('click', function () {
    isRunning = false;
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('milliseconds').textContent = '000';
    document.getElementById('lapContainer').textContent = '';
    lapCount = 1;
});

document.getElementById('lapBtn').addEventListener('click', function () {
    const lapTime = document.createElement('span');
    lapTime.className = "lap-item";
    lapTime.textContent = `Lap ${lapCount}: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
    lapCount++;
    document.getElementById('lapContainer').appendChild(lapTime);
});

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(millis) {
    return millis < 10 ? `00${millis}` : millis < 100 ? `0${millis}` : millis;
}
