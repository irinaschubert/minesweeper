
class FlagCounter{
    constructor(flagCounterElement){
        this.flagCounterElement = flagCounterElement;
    }

    resetFlagCount(){
        this.flagCounterElement.html(0);
    }

    updateFlagCount(){
        this.flagCounterElement.html($('.field.flagged').length);
    }
}

module.exports = FlagCounter;