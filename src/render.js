const Hours = document.getElementById("hours");
const Minutes = document.getElementById("minutes");
const Seconds = document.getElementById("seconds");

var startBtnClicked = false;
var startTimerId;

// initializes and sets timer up
initializeVariables();

function initializeVariables() {
    window.sessionStorage.setItem("standingTimeTotal", 5*60);
    window.sessionStorage.setItem("workingTimeTotal", 60*60);
    window.sessionStorage.setItem("initialized", "true");
    window.sessionStorage.setItem("standingTime", "false");
}

// assigns the variables 
var standingTimeTotal = parseInt(window.sessionStorage.getItem("standingTimeTotal"));
var workingTimeTotal = parseInt(window.sessionStorage.getItem("workingTimeTotal"));

if (window.sessionStorage.getItem("standingTime") == "true") {
    var currentTime = standingTimeTotal;
    var currentTimeTotal = standingTimeTotal;
} else { 
    var currentTime = workingTimeTotal;
    var currentTimeTotal = workingTimeTotal;
} 

// displays the timer on the screen
timer();

function timer() {
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
        document.getElementsByClassName("play-menu")[0].style.display = "none";

        if (window.sessionStorage.getItem("standingTime") == "false") {
            document.getElementsByClassName("nextBtn")[0].style.display = "block";
        } else {
            document.getElementsByClassName("checkBtn")[0].style.display = "block";
        }

    }

    currentTime--;
}

// start button functionality
function startTimer() {
    console.log(currentTime);
    console.log(standingTimeTotal);
    console.log(workingTimeTotal);
    if (!window.sessionStorage.getItem("initialized")) {
        initializeVariables();
    }
    if (!startBtnClicked) {
        startTimerId = setInterval(timer, 1000);
        startBtnClicked = true;
    }
}

// pause button functionality
function stopTimer() {
    console.log("timer should stop");
    clearInterval(startTimerId);
    startBtnClicked = false;
}

// restart button functionality 
function restartTimer() {
    console.log("timer should restart");
    const RestartDialog = document.getElementById("dialogBox");
    RestartDialog.showModal();
    clearInterval(startTimerId);
    startBtnClicked = false;
}

// yes button functionality
function yesButton() {
    currentTime = currentTimeTotal;
    const RestartDialog = document.getElementById("dialogBox");
    RestartDialog.close();

    timer();
}

// no button functionality
function noButton() {
    const RestartDialog = document.getElementById("dialogBox");
    RestartDialog.close();
}

// next button functionality
function nextButton() {
    console.log("next button was pressed");
    clearInterval(startTimerId);
    startBtnClicked = false;

    if (document.getElementsByClassName("nextBtn")[0].style.display == "block") {
        currentTime = standingTimeTotal;
        currentTimeTotal = standingTimeTotal;

        timer();
        document.getElementsByClassName("play-menu")[0].style.display = "flex";
        document.getElementsByClassName("nextBtn")[0].style.display = "none";

        document.getElementsByClassName("working-time")[0].innerHTML = "Stand.";

        window.sessionStorage.setItem("standingTime", "true");
    }
}

// check button functionality
function checkButton() {
    console.log("checkmark button was pressed");
    clearInterval(startTimerId);
    startBtnClicked = false;

    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.showModal();
}

function showStandingScreen() {
    clearInterval(startTimerId);
    startBtnClicked = false;

    timer();
    document.getElementsByClassName("play-menu")[0].style.display = "flex";
    document.getElementsByClassName("checkBtn")[0].style.display = "none";

    document.getElementsByClassName("working-time")[0].innerHTML = "Work.";

    window.sessionStorage.setItem("standingTime", "false");
}

// yep button functionality
function yepButton() {
    console.log("standed");

    showStandingScreen();

    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.close();
}

// oops button functionality
function oopsButton() {
    console.log("did not stand");
    currentTime = 2;
    currentTimeTotal = 2;

    timer();
    document.getElementsByClassName("play-menu")[0].style.display = "flex";
    document.getElementsByClassName("checkmark")[0].style.display = "none";

    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.close();
}

// settings button functionality
function settingsButton() {
    if (window.sessionStorage.getItem("standingTime") == "true") {
        window.location.href = "settingsStand.html";
    } else {
        window.location.href = "settingsWork.html";
    }
    
}

function closeButton() {
    window.electronAPI.closeWindow();
}

function minimizeButton() {
    window.electronAPI.minimizeWindow();
}
