// All time durations are expressed in seconds. 



function addZeroToSingleDigitStr(str) {
    result = (str.length == 1) ? "0" + str : str;
    return result;
}

var workSecondsID = "work-seconds";
var workMinutesID = "work-minutes";
var breakSecondsID = "break-seconds";
var breakMinutesID = "break-minutes";
var active = "work"; // work/break
var status = "reset"; // reset/elapsing/paused
var timer;

var defaultDuration = 0 * 60 + 5, defaultBreakDuration = 0 * 60 + 5;

stopReset()
function stopReset() {
    status = "reset";
    clearInterval(timer);
    document.getElementById("work-minutes").innerHTML = Math.floor(defaultDuration / 60).toString();
    document.getElementById("work-seconds").innerHTML = addZeroToSingleDigitStr((defaultDuration % 60).toString());
    document.getElementById("break-minutes").innerHTML = Math.floor(defaultBreakDuration / 60).toString();
    document.getElementById("break-seconds").innerHTML = addZeroToSingleDigitStr((defaultBreakDuration % 60).toString());
}


function startPause() {
    /*
    This function renders elapsing time on the work & break clocks, 
    whichever is applicable. 
    */
    console.log("calling startPause()...");
    if (status == "reset" || status == "paused") {
        status = "elapsing";
        // When time is elapsing, + and - buttons are inactive. 
        // xxxxxxxxx

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
                    // When break time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 
                    // and +/- buttons are active on work time side
                    document.getElementById("startBreaktimeBtn").classList.remove("invisible");
                    document.getElementById("resetBreaktimeBtn").classList.remove("invisible");
                    document.getElementById("startWorktimeBtn").classList.add("invisible");
                    document.getElementById("resetWorktimeBtn").classList.add("invisible");

                    // xxxxxxxx
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
            document.getElementById(secondsIDstr).textContent = addZeroToSingleDigitStr(seconds.toString());
        }
        console.log(seconds);
    }
}




// When work time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 
// and +/- buttons are active on break time side

// xxxxxxxx


