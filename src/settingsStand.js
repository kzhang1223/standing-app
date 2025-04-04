const oneMinInSec = 2;

var standingTimeTotal = parseInt(window.sessionStorage.getItem("standingTimeTotal"));
console.log(standingTimeTotal);

getTime(standingTimeTotal);

function getTime(time) {
    var hours = Math.floor(time / 60 / 60) % 24;
    var minutes = Math.floor(time / 60) % 60;
    var seconds = Math.floor(time) % 60;

    const Hours = document.getElementById("hours");
    const Minutes = document.getElementById("minutes");
    const Seconds = document.getElementById("seconds");

    Hours.innerHTML = hours.toString().padStart(2, 0);
    Minutes.innerHTML = minutes.toString().padStart(2, 0);
    Seconds.innerHTML = seconds.toString().padStart(2, 0);
}

// left arrow functionality
function leftArrow () {
    window.sessionStorage.setItem("standingTimeTotal", standingTimeTotal);
    window.location.href = "settingsWork.html";
}

// minus one minute
function minusOne () {
    if (standingTimeTotal-oneMinInSec > 0) {
        standingTimeTotal -= oneMinInSec;
    } else {
        standingTimeTotal = 0;
    }

    console.log(standingTimeTotal);
    getTime(standingTimeTotal);
}

// plus one minute
function plusOne () {
    if (standingTimeTotal+oneMinInSec > 24*60*60) {
        standingTimeTotal = 24*60*60;
    } else {
        standingTimeTotal += oneMinInSec;
        console.log(standingTimeTotal);
    }

    console.log(standingTimeTotal);
    getTime(standingTimeTotal);
}

function doneButton () {
    window.sessionStorage.setItem("standingTime", "true");
    window.sessionStorage.setItem("standingTimeTotal", standingTimeTotal);

    if (window.sessionStorage.getItem("workingTimeTotal") == null || window.sessionStorage.getItem("workingTimeTotal") == NaN) {
        window.sessionStorage.setItem("workingTimeTotal", 0);
    }

    if (window.sessionStorage.getItem("standingTimeTotal") == null || window.sessionStorage.getItem("standingTimeTotal") == NaN) {
        window.sessionStorage.setItem("standingTimeTotal", 0);
    }
    window.location.href = "index.html";
}

