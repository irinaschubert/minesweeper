import Timer from "../js/timer.js";

describe("timer", () => {

    it("seconds increases when timer is started", () => {
        let timer = new Timer();
        timer.startTimer();
        setTimeout(()=>{
            expect(timer.second).toBeGreaterThan(4);
        }
        ,5000
        );

    });

    it("seconds drops to 0 when timer is stopped", () => {
        let timer = new Timer();
        timer.startTimer();
        timer.stopTimer();
        expect(timer.second).toBe(0);
    });
});

