// right arrow button functionality
function rightArrow () {
    const Mode = document.getElementById("mode");
    const LeftArrowBtn = document.getElementById("leftArrow");
    const RightArrowBtn = document.getElementById("rightArrow");
    Mode.innerHTML = "Working";
    LeftArrowBtn.style.display = "flex";
    RightArrowBtn.style.display = "none";
    getTime(workingTimeTotal);
}

// left arrow button functionality
function leftArrow () {
    const Mode = document.getElementById("mode");
    const LeftArrowBtn = document.getElementById("leftArrow");
    const RightArrowBtn = document.getElementById("rightArrow");
    Mode.innerHTML = "Standing";
    LeftArrowBtn.style.display = "none";
    RightArrowBtn.style.display = "flex";
    getTime(standingTimeTotal);
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
