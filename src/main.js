let workTimeG = 1500;
let breakTimeG = 300;
let timerRunningG = false;
const bell = new Audio("http://www.jdsandifer.com/software-developer/audio/218851__kellyconidi__highbell.mp3");

let workTimer = $('.work-timer').FlipClock(workTimeG, {
    autoStart: false,
    clockFace: "MinuteCounter",
    countdown: true,
    callbacks: {
        interval: function() {
            if (workTimer.getTime().getSeconds() === 0) {
                soundBell();
                breakTimer.start();
            }
        }
    }
});

let breakTimer = $('.break-timer').FlipClock(breakTimeG, {
    autoStart: false,
    clockFace: "MinuteCounter",
    countdown: true,
    callbacks: {
        interval: function() {
            if (breakTimer.getTime().getSeconds() === 0) {
                soundBell();
                setTimeout(soundBell, 2000);
            }
        }
    }
});

function soundBell() {
    bell.play();
}

function toggleTimer() {
    if (timerRunningG) {
        timerRunningG = false;
        workTimer.stop();
    } else {
        timerRunningG = true;
        workTimer.start();
    }
}

function resetTimer() {
    timerRunningG = false;
    workTimer.stop();
    breakTimer.stop();
    workTimer.setTime(workTimeG);
    breakTimer.setTime(breakTimeG);
}

function changeWorkTime(amount) {
    // Change global value - used for timer reset
    workTimeG = (workTimeG+amount >= 0) ? workTimeG+amount : 0;
    
    // Shift amount returned by getSeconds up one to fix bug...
    let time = workTimer.getTime().getSeconds() + 1;
    let newTime = (time+amount >= 0) ? time+amount : 0;
    workTimer.setTime(newTime);
}

function changeBreakTime(amount) {
    // Change global value - used for timer reset
    breakTimeG = (breakTimeG+amount >= 0) ? breakTimeG+amount : 0;
    // Shift amount returned by getSeconds up one to fix bug...
    let time = breakTimer.getTime().getSeconds() + 1;
    let newTime = (time+amount >= 0) ? time+amount : 0;
    breakTimer.setTime(newTime);
}

$('.work-timer').click(toggleTimer);
$('.break-timer').click(resetTimer);

$('.work-less').click(()=>{changeWorkTime(-60);});
$('.work-more').click(()=>{changeWorkTime(60);});
$('.break-less').click(()=>{changeBreakTime(-60);});
$('.break-more').click(()=>{changeBreakTime(60);});
