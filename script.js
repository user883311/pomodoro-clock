// HTML elements values:
var workSecondsID = "work-seconds";
var workMinutesID = "work-minutes";
var breakSecondsID = "break-seconds";
var breakMinutesID = "break-minutes";

var active = "work"; // work/break
var status = "reset"; // reset/elapsing/paused
var timer, timer2, timerCounter = 0;
var canvas = document.getElementById('background-canvas');

var resetCount = 0; // 0, 1, 2
var statusPct = 0 / 100;
var curtainMeter = 0;
// Note: all time durations are expressed in milliseconds. 
var timerPace = 20;
var curtainPace = 20;
// This should be adjustable in Settings in the future. 
var displayWorkDuration = 0 * 60 + 5, displayBreakDuration = 0 * 60 + 5;
var defaultWorkDuration = displayWorkDuration * 1000, defaultBreakDuration = displayBreakDuration * 1000;

var boxingBell = new Audio("sounds/boxing-bell.wav"); // buffers automatically when created
var backToWork = new Audio("sounds/backToWork.wav"); // buffers automatically when created
// Sounds source: https://freesound.org/

// Initialize timer values. 
stopReset();
resetCount = 0;
function stopReset() {
    status = "reset";
    clearInterval(timer);
    // clearInterval(timer2);
    resetBackgroundCanvas();


    let arrStartBtn = document.getElementsByClassName("startBtn");
    arrStartBtn[0].textContent = "N";
    arrStartBtn[1].textContent = "N";

    // Reset current activity timers to their default values. 
    if (active == "work") {
        resetTimer("work");
        resetTimer("break");
        enableButtons("work");
    }
    else if (active == "break") {
        resetCount++;
        resetTimer("break");
        enableButtons("break");
        document.getElementById("resetBreaktimeBtn").textContent = "z";
    }
    // if pressed for the 2nd time, reset both activity timers to their default values
    if (resetCount == 2) {

        resetTimer("work");
        resetTimer("break");
        // and set active activity back to work
        active = "work";
        document.getElementById("startBreaktimeBtn").classList.add("invisible");
        document.getElementById("resetBreaktimeBtn").classList.add("invisible");
        document.getElementById("startWorktimeBtn").classList.remove("invisible");
        document.getElementById("resetWorktimeBtn").classList.remove("invisible");
        resetCount = 0;
        enableButtons("work");
        enableButtons("break");

        document.getElementsByClassName("container2")[0].classList.remove("activeContainer");
        document.getElementsByClassName("container1")[0].classList.add("activeContainer");
        document.getElementById("resetBreaktimeBtn").textContent = "P";
    }
}

function resetTimer(activityID) {
    if (activityID == "work") {
        document.getElementById(workMinutesID).textContent = addZeroToSingleDigitStr(Math.floor(defaultWorkDuration / 60000).toString());
        document.getElementById(workSecondsID).textContent = addZeroToSingleDigitStr((defaultWorkDuration % 60000 / 1000).toString());
    }
    else if (activityID = "break") {
        document.getElementById(breakMinutesID).textContent = addZeroToSingleDigitStr(Math.floor(defaultBreakDuration / 60000).toString());
        document.getElementById(breakSecondsID).textContent = addZeroToSingleDigitStr((defaultBreakDuration % 60000 / 1000).toString());
    }
}

function startPause() {
    /*
    This function renders elapsing time on the work & break clocks, 
    whichever is applicable. 
    */
    // console.log("calling startPause()...");
    let total; // total number of break or work duration
    if (status == "reset" || status == "paused") {
        status = "elapsing";
        disableButtons(active);
        timer = setInterval(elapsesTime, timerPace);
        // timer2 = setInterval(dropCurtain, curtainPace); 
        let arrStartBtn = document.getElementsByClassName("startBtn");
        arrStartBtn[0].textContent = "O";
        arrStartBtn[1].textContent = "O";
    }
    else if (status == "elapsing") {
        status = "paused";
        enableButtons(active);
        clearInterval(timer);
        // clearInterval(timer2);
        // console.log("clearInterval");
        let arrStartBtn = document.getElementsByClassName("startBtn");
        arrStartBtn[0].textContent = "N";
        arrStartBtn[1].textContent = "N";
    }

    function elapsesTime() {
        timerCounter += timerPace;
        // console.log(timer);
        // console.log("status =", status);
        if (timerCounter % 1000 == 0) {

            if (active == "work") {
                minutesIDstr = workMinutesID;
                secondsIDstr = workSecondsID;
                total = defaultWorkDuration;
                document.getElementsByClassName("container2")[0].classList.remove("activeContainer");
                document.getElementsByClassName("container1")[0].classList.add("activeContainer");
                // When time is elapsing, + and - buttons are inactive. 
                disableButtons("work");
                enableButtons("break");
            }
            else if (active == "break") {
                minutesIDstr = breakMinutesID;
                secondsIDstr = breakSecondsID;
                total = defaultBreakDuration;
                
                disableButtons("break");
                enableButtons("work");
            }

            // console.log(minutesIDstr, secondsIDstr);
            let seconds = document.getElementById(secondsIDstr).textContent;
            let minutes = document.getElementById(minutesIDstr).textContent;
            // console.log(minutes, seconds);

            if (seconds == 1) {
                seconds--;
                document.getElementById(secondsIDstr).textContent = addZeroToSingleDigitStr(seconds.toString());

                if (minutes == 0) {
                    if (active == "work") {
                        boxingBell.play();
                        active = "break";
                        disableButtons(active);
                        enableButtons("work");

                        document.getElementsByClassName("container1")[0].classList.remove("activeContainer");
                        document.getElementsByClassName("container2")[0].classList.add("activeContainer");
        

                        // When break time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 
                        // and +/- buttons are active on work time side
                        document.getElementById("startBreaktimeBtn").classList.remove("invisible");
                        document.getElementById("resetBreaktimeBtn").classList.remove("invisible");
                        document.getElementById("startWorktimeBtn").classList.add("invisible");
                        document.getElementById("resetWorktimeBtn").classList.add("invisible");

                        // reset background canvas
                        resetBackgroundCanvas();



                    }
                    else if (active == "break") {
                        boxingBell.play();
                        backToWork.play();
                        clearInterval(timer);
                        clearInterval(timer2);
                    }
                }
                else {
                    seconds = 59;
                    minutes--;
                    document.getElementById(secondsIDstr).textContent = seconds;
                    document.getElementById(minutesIDstr).textContent = minutes;
                }
            }
            else {
                seconds--;
                document.getElementById(secondsIDstr).textContent = addZeroToSingleDigitStr(seconds.toString());
            }
            // console.log(seconds);

            // update %
            // console.log("minutes", minutes, "seconds", seconds, "total", total);
            statusPct = 1 - (minutes * 60 + seconds) / total;
            // console.log("statusPct", statusPct);
        }

        // now for the curtain.... 
        dropCurtain();
    }



}

function add(htmlElementID) {
    /*This function adds +1 unit to the HTML value inside the 
    HTML element. */
    let result = document.getElementById(htmlElementID).textContent;

    // control for seconds max 59
    if (htmlElementID == workSecondsID || htmlElementID == breakSecondsID) {
        if (result == 59) {
            result = 0;
        }
        else { result++ }
    }
    else { result++; }
    result = addZeroToSingleDigitStr(result.toString());
    document.getElementById(htmlElementID).textContent = result;

    //reset
    defaultWorkDuration = parseInt(document.getElementById(workMinutesID).textContent) * 60000
        + parseInt(document.getElementById(workSecondsID).textContent)*1000;
    defaultBreakDuration = parseInt(document.getElementById(breakMinutesID).textContent) * 60000
        + parseInt(document.getElementById(breakSecondsID).textContent)*1000;

    // reset canvas
    resetBackgroundCanvas();
}
function subtract(htmlElementID) {
    /*This function subracts +1 unit to the HTML value inside the 
    HTML element. */
    let elementValue = document.getElementById(htmlElementID).textContent;
    if (elementValue != 0) {
        let result = elementValue;
        result--;
        result = addZeroToSingleDigitStr(result.toString());
        document.getElementById(htmlElementID).textContent = result;

        //reset
        defaultWorkDuration = parseInt(document.getElementById(workMinutesID).textContent) * 60000
            + parseInt(document.getElementById(workSecondsID).textContent)*1000;
        defaultBreakDuration = parseInt(document.getElementById(breakMinutesID).textContent) * 60000
            + parseInt(document.getElementById(breakSecondsID).textContent)*1000;

        // reset canvas
        resetBackgroundCanvas();
    }
}

function addZeroToSingleDigitStr(str) {
    result = (str.length == 1) ? "0" + str : str;
    return result;
}

function disableButtons(activityStr) {
    let arr = document.getElementsByClassName(activityStr + " plusBtn");
    arr[0].disabled = true;
    arr[1].disabled = true;
    arr = document.getElementsByClassName(activityStr + " minusBtn");
    arr[0].disabled = true;
    arr[1].disabled = true;
}

function enableButtons(activityStr) {
    let arr = document.getElementsByClassName(activityStr + " plusBtn");
    arr[0].disabled = false;
    arr[1].disabled = false;
    arr = document.getElementsByClassName(activityStr + " minusBtn");
    arr[0].disabled = false;
    arr[1].disabled = false;
}

function dropCurtain() {
    let total;
    if (active == "work") {
        total = defaultWorkDuration;
    }
    else if (active == "break") {
        total = defaultBreakDuration;
    }
    curtainMeter += timerPace;
    console.log(curtainMeter, total);
    let curtainProgress = curtainMeter / total;
    console.log(curtainProgress);

    // reset background canvas
    // if (curtainProgress >= 1) {
    //     resetBackgroundCanvas();
    // }

    if (canvas.getContext) {
        // console.log("DropCurtain() loaded.")
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(172, 206, 168)';
        ctx.fillRect(0, 0, canvas.width, canvas.height * curtainProgress);
    }
}

function resetBackgroundCanvas() {
    if (canvas.getContext) {
        console.log("clearing the canvas...")
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    curtainMeter = 0;
}