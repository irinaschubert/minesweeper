let Timer = require('../js/timer.js');

describe("startTimer", () => {
    test('start timer correctly', () => {
        startTimer();
        expect(startTimer()).toBe(5);
    });

});