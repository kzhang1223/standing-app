const thirtyMinInSec = 30*60;
const oneMinInSec = 60;

var standingTimeTotal = parseInt(window.localStorage.getItem("standingTimeTotal"));
var workingTimeTotal = parseInt(window.localStorage.getItem("workingTimeTotal"));
console.log(standingTimeTotal);
console.log(workingTimeTotal);

// right arrow button functionality
function rightArrow () {
    const Mode = document.getElementById("mode");
    const LeftArrowBtn = document.getElementById("leftArrow");
    const RightArrowBtn = document.getElementById("rightArrow");
    const MinusThirtyBtn = document.getElementById("minusThirty");
    const PlusThirtyBtn = document.getElementById("plusThirty");
    const MinusOneBtn = document.getElementById("minusOne");
    const PlusOneBtn = document.getElementById("plusOne");

    Mode.innerHTML = "Working";
    LeftArrowBtn.style.display = "flex";
    RightArrowBtn.style.display = "none";
    getTime(workingTimeTotal);

    MinusThirtyBtn.style.display = "flex";
    PlusThirtyBtn.style.display = "flex";
    MinusOneBtn.style.display = "none";
    PlusOneBtn.style.display = "none";
}

// left arrow button functionality
function leftArrow () {
    const Mode = document.getElementById("mode");
    const LeftArrowBtn = document.getElementById("leftArrow");
    const RightArrowBtn = document.getElementById("rightArrow");
    const MinusThirtyBtn = document.getElementById("minusThirty");
    const PlusThirtyBtn = document.getElementById("plusThirty");
    const MinusOneBtn = document.getElementById("minusOne");
    const PlusOneBtn = document.getElementById("plusOne");

    Mode.innerHTML = "Standing";
    LeftArrowBtn.style.display = "none";
    RightArrowBtn.style.display = "flex";
    getTime(standingTimeTotal);

    MinusThirtyBtn.style.display = "none";
    PlusThirtyBtn.style.display = "none";
    MinusOneBtn.style.display = "flex";
    PlusOneBtn.style.display = "flex";
}

function getTime(time) {
    var hours = Math.floor(time / 60 / 60) % 24;
    var minutes = Math.floor(time / 60) % 60;
    var seconds = Math.floor(time) % 60;

    Hours = document.getElementById("hours");
    const Minutes = document.getElementById("minutes");
    const Seconds = document.getElementById("seconds");

    Hours.innerHTML = hours.toString().padStart(2, 0);
    Minutes.innerHTML = minutes.toString().padStart(2, 0);
    Seconds.innerHTML = seconds.toString().padStart(2, 0);
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
// TODO: when it gets to 24 hours it breaks and turns to 0 
function plusThirty () {
    if (workingTimeTotal+thirtyMinInSec > 24*60*60) {
        workingTimeTotal = 24*60*60;
    } else {
        workingTimeTotal += thirtyMinInSec;
    }

    console.log(workingTimeTotal);
    getTime(workingTimeTotal);
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
// TODO: when it gets to 24 hours it breaks and turns to 0 
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
    window.localStorage.setItem("standingTimeTotal", standingTimeTotal);
    window.localStorage.setItem("workingTimeTotal", workingTimeTotal);
    window.location.href = "index.html";
}

