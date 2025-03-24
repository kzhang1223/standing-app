const Hours = document.getElementById("hours");
const Minutes = document.getElementById("minutes");
const Seconds = document.getElementById("seconds");

var startBtnClicked = false;
var startTimerId;

// initializes and sets timer up
var currentTime = 60 * 60;
var currentTimeTotal = 60 * 60;

function timer () {

    var hours = Math.floor(currentTime / 60 / 60) % 24;
    var minutes = Math.floor(currentTime / 60) % 60;
    var seconds = Math.floor(currentTime) % 60;

    Hours.innerHTML = hours.toString().padStart(2, 0);
    Minutes.innerHTML = minutes.toString().padStart(2, 0);
    Seconds.innerHTML = seconds.toString().padStart(2, 0);

    if (currentTime < 0) {
        Hours.innerHTML = "00";
        Minutes.innerHTML = "00";
        Seconds.innerHTML = "00";
    }

    currentTime--;
}

// start button functionality
function startTimer () {
    if (!startBtnClicked) {
        startTimerId = setInterval(timer, 1000);
        console.log(startTimerId);
        startBtnClicked = true;
    }
}

// pause button functionality
function stopTimer () {
    console.log("timer should stop");
    console.log(startTimerId);
    clearInterval(startTimerId);
    startBtnClicked = false;
}

