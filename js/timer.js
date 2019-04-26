const $timerCounter = $('#timerCounter');

class Timer{
    constructor(){
        let interval;
    }

    startTimer() {
        let second = 0;
        this.interval = setInterval(function () {
            $timerCounter.html(second.toString());
            second++;
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interval);
    }

    resetTimer() {
        this.stopTimer();
        this.startTimer();
    }
}

module.exports = Timer;