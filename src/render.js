const Hours = document.getElementById("hours");
const Minutes = document.getElementById("minutes");
const Seconds = document.getElementById("seconds");

var startBtnClicked = false;
var startTimerId;

var standingTime = false;
var initialized = false;

var standingTimeTotal = window.localStorage.getItem("standingTimeTotal");
var workingTimeTotal = window.localStorage.getItem("workingTimeTotal");
console.log(standingTimeTotal)
console.log(workingTimeTotal)

// initializes and sets timer up
var currentTime = workingTimeTotal;
var currentTimeTotal = workingTimeTotal;

function initializeVariables () {
    window.localStorage.setItem("standingTimeTotal", "300");
    window.localStorage.setItem("workingTimeTotal", "3600");
    initialized = true;
    window.localStorage.setItem("initialized", true);
}

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

    if (currentTime == 0) {
        document.getElementsByClassName("buttonmenu")[0].style.display = "none";
        
        if (!standingTime) {
            document.getElementsByClassName("next")[0].style.display = "flex";
        } else {
            document.getElementsByClassName("checkmark")[0].style.display = "flex";
        }
        
    }

    currentTime--;
}

// start button functionality
function startTimer () {
    console.log(currentTime);
    console.log(standingTimeTotal);
    console.log(workingTimeTotal);
    if (!window.localStorage.getItem("initialized")) {
        initializeVariables();
    }
    if (!startBtnClicked) {
        startTimerId = setInterval(timer, 1000);
        startBtnClicked = true;
    }
}

// pause button functionality
function stopTimer () {
    console.log("timer should stop");
    clearInterval(startTimerId);
    startBtnClicked = false;
}

// restart button functionality 
function restartTimer () {
    console.log("timer should restart");
    const RestartDialog = document.getElementById("dialogBox");
    RestartDialog.showModal();
    clearInterval(startTimerId);
    startBtnClicked = false;
} 

// yes button functionality
function yesButton () {
    currentTime = currentTimeTotal;
    const RestartDialog = document.getElementById("dialogBox");
    RestartDialog.close();

    timer();
}

// no button functionality
function noButton () {
    const RestartDialog = document.getElementById("dialogBox");
    RestartDialog.close();
    startTimerId = setInterval(timer, 1000);
}

// next button functionality
function nextButton () {
    console.log("next button was pressed");
    clearInterval(startTimerId);
    startBtnClicked = false;

    if (document.getElementsByClassName("next")[0].style.display == "flex") {
        currentTime = standingTimeTotal;
        currentTimeTotal = standingTimeTotal;

        timer();
        document.getElementsByClassName("buttonmenu")[0].style.display = "flex";
        document.getElementsByClassName("next")[0].style.display = "none";

        document.getElementById("title").innerHTML = "Standing Time";
        document.getElementById("subtitle").innerHTML = "It is time to stand.";

        standingTime = true;
    }
}

// check button functionality
function checkButton () {
    console.log("checkmark button was pressed");
    clearInterval(startTimerId);
    startBtnClicked = false;
    
    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.showModal();
}

// yep button functionality
function yepButton () {
    console.log("standed");
    currentTime = 1;
    currentTimeTotal = 1;

    timer();
    document.getElementsByClassName("buttonmenu")[0].style.display = "flex";
    document.getElementsByClassName("checkmark")[0].style.display = "none";

    document.getElementById("title").innerHTML = "Working Time";
    document.getElementById("subtitle").innerHTML = "It is time to work.";

    standingTime = false;
    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.close();
}

// oops button functionality
function oopsButton () {
    console.log("did not stand");
    currentTime = 2;
    currentTimeTotal = 2;

    timer();
    document.getElementsByClassName("buttonmenu")[0].style.display = "flex";
    document.getElementsByClassName("checkmark")[0].style.display = "none";
    
    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.close();
}

// settings button functionality
function settingsButton () {
    window.location.href = "settings.html";
}
