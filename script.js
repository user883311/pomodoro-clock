// All time durations are expressed in seconds. 

var defaultDuration = 25 * 60, defaultBreakDuration = 5 * 60;
var elapsing = false;

var workSecondsID = "work-seconds";
var workMinutesID = "work-minutes";
var breakSecondsID = "break-seconds";
var breakMinutesID = "break-minutes";
var active = "work"; // work/break
var status = "reset"; // reset/elapsing/paused


var timer;
function startPause() {
    /*
    This function renders elapsing time on the work & break clocks, 
    whichever is applicable. 
    */
    console.log("calling startPause()...");
    if (status == "reset" || status == "paused") {
        status = "elapsing";
        timer = setInterval(elapsesTime, 1000);
    }
    else if (status == "elapsing") {
        status = "paused";
        clearInterval(timer);
        console.log("clearInterval");
    }

    function elapsesTime() {
        console.log("status =", status);
        if (active == "work") {
            minutesIDstr = workMinutesID;
            secondsIDstr = workSecondsID;
        }
        else if (active == "break") {
            minutesIDstr = breakMinutesID;
            secondsIDstr = breakSecondsID;
        }

        console.log(minutesIDstr, secondsIDstr);
        let seconds = document.getElementById(secondsIDstr).textContent;
        let minutes = document.getElementById(minutesIDstr).textContent;
        console.log(minutes, seconds);

        if (seconds == 0) {
            if (minutes == 0) {
                if (active == "work") {
                    active = "break";
                }
                else if (active == "break") {
                    alert("rrriiiIIIIIIIIINNGG !!");
                    clearInterval(timer);
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
            if (seconds < 10) {
                document.getElementById(secondsIDstr).textContent = "0" + seconds;
            }
            else {
                document.getElementById(secondsIDstr).textContent = seconds;
            }
        }
        console.log(seconds);
    }
}

// When time is elapsing, + and - buttons are inactive. 

// When work time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 

// When break time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 



