import FlagCounter from "../js/flagCounter.js";


describe("flag counter", () => {

    it("reset flag counter to 0", () => {
        // Set up a mock body
        document.body.innerHTML = '<div id="counter">0</div>';
        const $flagCounter = $('#counter');
        let fc = new FlagCounter($flagCounter);
        fc.resetFlagCount();
        expect(fc.flagCounterElement.html()).toBe("0");
    });

    it("update flag counter", () => {
        // Set up a mock body
        document.body.innerHTML = '<div id="counter">0</div><div class="field hidden mine flagged" data-row="4" data-col="6"></div><div class="field hidden mine flagged" data-row="4" data-col="6"></div>';
        const $flagCounter = $('#counter');
        let fc = new FlagCounter($flagCounter);
        fc.updateFlagCount();
        expect(fc.flagCounterElement.html()).toBe("2");
    });

});