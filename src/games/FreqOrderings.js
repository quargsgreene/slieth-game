class FreqOrderings {
    constructor(elements, numOrderingChoices) {
        this.elements = elements;
        this.sequelae = 0;
        this.carrots = 0;
        this.guess = null;
        this.malaise = null;
        this.win = false;
        this.lose = false;
        this.numOrderingChoices = numOrderingChoices;
    }

    determineMalaiseOutcome(malaise){
        if(malaise){
            return 1
        }
        return -1;
    }

    determineGameOutcome(malaiseOutcome, guess){
        if(guess){
            
        }
    }

    // win
    win(){
        //Not yet implemented
        return;
    }
    // lose
    lose() {
        //Not yet implemented
        return;
    }
    // calculateOrderingChoices
    calculateOrderingChoices(elements, numOrderingChoices) {
        //Not yet implemented
        return;
    }

    //determine the correct ascending order 
    orderElements(elements){
        //Not yet implemented
        return;
    }

}

class FreqOrderingsGameElement {
    constructor(audio, numSamplesPerElement, minPlaybackDuration, maxPlaybackDuration){
        this.audio = audio;
        this.numSamplesPerElement = numSamplesPerElement;
        this.numSamplesPerElement = numOrderingChoices;
        this.minPlaybackDuration = minPlaybackDuration;
        this.maxPlaybackDuration = maxPlaybackDuration;
        this.orderingIndex = 0;
    }
    // TODO: implement methods:
    // mapAudioFreqsToEmFreqs
    // mapEmFreqsToColor
    // getRawAudioElementData
    // getAverageAudioElementFreq
    // generateAudioFiles
    // generateElement
    // calculateMagnitudeFromFreqs
}