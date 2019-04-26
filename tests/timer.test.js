const Timer = require('../js/timer.js');

describe("startTimer", () => {
    it('start timer correctly', () => {
        let $timerCounter = document.getElementById("timerCounter");
        const timer = new Timer();
        timer.startTimer();
        const expected = $timerCounter.text();
        expect(timer.startTimer()).toBe(expected);
    });

});