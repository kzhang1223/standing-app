const Hours = document.getElementById("hours");
const Minutes = document.getElementById("minutes");
const Seconds = document.getElementById("seconds");

var startBtnClicked = false;
var startTimerId;

const penguinImage = document.getElementsByClassName("image-icon")[0];
const touchSomeGrass = document.getElementsByClassName("touch-some-grass")[0];
const grabASnack = document.getElementsByClassName("grab-a-snack")[0];
const move = document.getElementsByClassName("move")[0];
const nootNoot = document.getElementsByClassName("noot-noot")[0];
const walkAround = document.getElementsByClassName("walk-around")[0];
const getSomeWater = document.getElementsByClassName("get-some-water")[0];

var textToShow = [touchSomeGrass, grabASnack, move, nootNoot, walkAround, getSomeWater];
var textToShowIndex = -1;

// initializes and sets timer up
if (window.sessionStorage.getItem("standingTimeTotal") == null) {
    initializeVariables();
}

function initializeVariables() {
    window.sessionStorage.setItem("standingTimeTotal", 2);
    window.sessionStorage.setItem("workingTimeTotal", 1);
    window.sessionStorage.setItem("initialized", "true");
    window.sessionStorage.setItem("standingTime", "false");
}

// assigns the variables 
var standingTimeTotal = parseInt(window.sessionStorage.getItem("standingTimeTotal"));
var workingTimeTotal = parseInt(window.sessionStorage.getItem("workingTimeTotal"));

if (window.sessionStorage.getItem("standingTime") == "true") {
    var currentTime = standingTimeTotal;
    var currentTimeTotal = standingTimeTotal;
    document.getElementsByClassName("working-time")[0].innerHTML = "Stand.";
} else {
    var currentTime = workingTimeTotal;
    var currentTimeTotal = workingTimeTotal;
    document.getElementsByClassName("working-time")[0].innerHTML = "Work.";
}
console.log(currentTime);

// displays the timer on the screen
timer();

// makes sure alarm sound is not playing when page is loaded
stopPenguinAudio();

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
            if (document.getElementsByClassName("checkmark")[0].style.display == "none") {
                document.getElementsByClassName("checkmark")[0].style.display = "block";
            }
            document.getElementsByClassName("checkBtn")[0].style.display = "block";
        }

        const waddleAudio = document.getElementById("waddleAudio");
        const penguinAudio = document.getElementById("penguinAudio");

        waddleAudio.play();

        penguinAudioPlayed = 0;
        waddleAudio.addEventListener("ended", () => {
            penguinAudio.loop = true;
            penguinAudio.volume = 0.8;
            penguinAudio.play();
            penguinAudioPlayed++;

            if (penguinAudioPlayed == 15) {
                penguinAudio.pause();
                penguinAudio.currentTime = 0;
                penguinAudioPlayed = 0;
            }
        });
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

// stops the penguin audio alarm
function stopPenguinAudio() {
    const waddleAudio = document.getElementById("waddleAudio");
    const penguinAudio = document.getElementById("penguinAudio");
    waddleAudio.pause();
    waddleAudio.currentTime = 0;
    penguinAudio.pause();
    penguinAudio.currentTime = 0;
}

// next button functionality
function nextButton() {
    console.log("next button was pressed");
    clearInterval(startTimerId);
    startBtnClicked = false;
    stopPenguinAudio();

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
    stopPenguinAudio();

    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.showModal();
}

function showWorkingScreen() {
    clearInterval(startTimerId);
    startBtnClicked = false;

    document.getElementsByClassName("play-menu")[0].style.display = "flex";
    document.getElementsByClassName("checkmark")[0].style.display = "none";

    document.getElementsByClassName("working-time")[0].innerHTML = "Work.";

    window.sessionStorage.setItem("standingTime", "false");

    currentTime = workingTimeTotal;
    currentTimeTotal = workingTimeTotal;
    timer();
}

// yep button functionality
function yepButton() {
    console.log("standed");

    showWorkingScreen();

    touchSomeGrass.style.display = "none";
    grabASnack.style.display = "none";  
    move.style.display = "none";
    nootNoot.style.display = "none";
    walkAround.style.display = "none";
    getSomeWater.style.display = "none";

    const CheckDialog = document.getElementById("checkDialog");
    CheckDialog.close();
}

// oops button functionality
function oopsButton() {
    console.log("did not stand");
    currentTime = standingTimeTotal;
    currentTimeTotal = standingTimeTotal;

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

// make the penguin interactive in the standing timer screen
penguinImage.addEventListener("click", () => {
    console.log(textToShowIndex);
    console.log(textToShow.length);
    if (window.sessionStorage.getItem("standingTime") == "true") {
        if (textToShowIndex >= textToShow.length) {
            textToShowIndex = 0;
            removeEventListener("click", () => { });
        } else {
            textToShowIndex++;
        }
        textToShow[textToShowIndex].style.display = "block";
    }
});

penguinImage.addEventListener("mouseenter", () => {
    if (window.sessionStorage.getItem("standingTime") == "true") {
        penguinImage.style.transform = "scale(1.05)";
        penguinImage.style.transition = "transform 0.3s ease";
    }
});

penguinImage.addEventListener("mouseleave", () => {
    if (window.sessionStorage.getItem("standingTime") == "true") {
        penguinImage.style.transform = "scale(1)";
    }
});
