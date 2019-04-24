// game timer

let interval;
export function startTimer() {
    let second = 0;
    interval = setInterval(function () {
        $timerCounter.html(second.toString());
        second++;
    }, 1000);
}

export function stopTimer(){
    clearInterval(interval);
}

export function resetTimer() {
    stopTimer();
    startTimer();
}