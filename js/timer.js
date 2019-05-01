let $timerCounter = $('#timerCounter');

export default class Timer{
    constructor(){
        this.second = 0;
    }

    startTimer() {
        let second = this.second;
        this.interval = setInterval(function () {
            $timerCounter.html(second.toString());
            second++;
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interval);
        this.second = 0;
    }

    resetTimer() {
        this.stopTimer();
        this.startTimer();
    }
}