// All time durations are expressed in seconds. 

var defaultDuration = 25 * 60, defaultBreakDuration = 5 * 60;
var elapsing = false;

var workSecondsID = "work-seconds";
var workMinutesID = "work-minutes";
var breakSecondsID = "break-seconds";
var breakSecondsID = "break-seconds";

function start() {
    /*
    This function renders elapsing time on the work & break clocks, 
    whichever is applicable. 
    */
    setInterval(elapsesWorkTime(workMinutesID, workSecondsID), 1000);
    function elapsesWorkTime(minutesIDstr, secondsIDstr) {
        console.log(minutesIDstr, secondsIDstr);
        let seconds = document.getElementById(secondsIDstr).textContent;
        let minutes = document.getElementById(minutesIDstr).textContent;
        console.log(minutes, seconds);

        if (seconds == 0) {
            if (minutes == 0) {
                // setInterval(elapsesBreakTime, 1000);
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



