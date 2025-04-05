const thirtyMinInSec = 1;

var workingTimeTotal = parseInt(window.sessionStorage.getItem("workingTimeTotal"));
console.log(workingTimeTotal);
console.log(typeof(workingTimeTotal));

getTime(workingTimeTotal);

if (window.sessionStorage.getItem("okButtonPressed") != null) {
    document.getElementsByClassName("timer-check")[0].style.display = "none";
    document.getElementsByClassName("OKBtn")[0].style.display = "none";
}

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

// right arrow functionality
function rightArrow () {
    window.sessionStorage.setItem("workingTimeTotal", workingTimeTotal);
    window.location.href = "settingsStand.html";
}

// minus thirty minutes
function minusThirty () {
    if (workingTimeTotal-thirtyMinInSec > 0) {
        workingTimeTotal -= thirtyMinInSec;
    } else {
        workingTimeTotal = 0;
    }

    console.log(workingTimeTotal);
    getTime(workingTimeTotal);
}

// plus thirty minutes
function plusThirty () {
    if (workingTimeTotal+thirtyMinInSec > 24*60*60) {
        workingTimeTotal = 24*60*60;
    } else {
        workingTimeTotal += thirtyMinInSec;
    }

    console.log(workingTimeTotal);
    getTime(workingTimeTotal);
}

function doneButton () {
    window.sessionStorage.setItem("workingTimeTotal", workingTimeTotal);

    if (window.sessionStorage.getItem("workingTimeTotal") == null || window.sessionStorage.getItem("workingTimeTotal") == NaN) {
        window.sessionStorage.setItem("workingTimeTotal", 0);
    }

    if (window.sessionStorage.getItem("standingTimeTotal") == null || window.sessionStorage.getItem("workingTimeTotal") == NaN) {
        window.sessionStorage.setItem("standingTimeTotal", 0);
    }
    window.location.href = "index.html";
}


