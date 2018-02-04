// All time durations are expressed in seconds. 

var defaultDuration = 25 * 60, defaultBreakDuration = 5 * 60;


function startResume() {
    /*
    This function renders elapsing time on the work/break clocks, 
    whichever is applicable. 
    */
    let workDuration = document.getElementById("work-minutes").innerHTML * 60
        + document.getElementById("work-seconds").innerHTML
        ;
    let breakDuration = document.getElementById("break-minutes").innerHTML * 60
        + document.getElementById("break-seconds").innerHTML
        ;
    

}



// When time is elapsing, + and - buttons are inactive. 

// When work time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 

// When break time is elapsing, Start/Resume and Stop/Reset buttons are active on that side. 



