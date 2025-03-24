const Hours = document.getElementById("hours");
const Minutes = document.getElementById("minutes");
const Seconds = document.getElementById("seconds");

var startBtnClicked = false;
var startTimerId;

var standingTime = false;

// initializes and sets timer up
var currentTime = 1;
var currentTimeTotal = 1;

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

// restart button functionality 
function restartTimer () {
    console.log("timer should restart");
    var restart = window.confirm("Are you sure you want to restart?");
    clearInterval(startTimerId);
    startBtnClicked = false;

    if (restart) {
        currentTime = currentTimeTotal;
    }

    timer();
} 

// next button functionality
function nextButton () {
    console.log("next button was pressed");
    clearInterval(startTimerId);
    startBtnClicked = false;

    if (document.getElementsByClassName("next")[0].style.display == "flex") {
        currentTime = 2;
        currentTimeTotal = 2;

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
    
    var stood = window.confirm("Are you sure you stood? (you better not be lying)");
    if (stood) {
        console.log("standed");
        currentTime = 1;
        currentTimeTotal = 1;

        timer();
        document.getElementsByClassName("buttonmenu")[0].style.display = "flex";
        document.getElementsByClassName("checkmark")[0].style.display = "none";

        document.getElementById("title").innerHTML = "Working Time";
        document.getElementById("subtitle").innerHTML = "It is time to work.";

        standingTime = false;
    } else {
        console.log("did not stand");
        currentTime = 2;
        currentTimeTotal = 2;

        timer();
        document.getElementsByClassName("buttonmenu")[0].style.display = "flex";
        document.getElementsByClassName("checkmark")[0].style.display = "none";
    }
}
