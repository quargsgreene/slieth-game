import useStore from '../components/useStore';

class FreqOrderings {
    constructor(elements, numOrderingChoices, losingNodeToInsert) {
        this.elements = elements;
        this.sequelae = 0;
        this.carrots = 0;
        this.guess = null;
        this.malaise = null;
        this.losingNodeToInsert = losingNodeToInsert;
        this.win = false;
        this.lose = false;
        this.numOrderingChoices = numOrderingChoices;
    }

    determineMalaiseOutcome(malaise){
        if(malaise){
            return 1
        }
        return 0;
    }

    determineGameOutcome(malaiseOutcome, guess){
        if(guess){
            this.win(malaiseOutcome);
        } else {
            this.lose(malaiseOutcome);
        }
    }

    // win
    win(malaiseOutcome){
        const state = useStore.getState();
        const gameTree = state.gameTree;
        //Not yet implemented
        if(this.malaise){
            this.carrots = 10;
            this.sequelae = -2;
            gameTree.extractRootGameNode();
        } else {
            this.carrots = 2;
            this.sequelae = -1;
            gameTree.deleteGameNode(gameTree.nodes.length - 1);
        }
        return;
    }
    // lose
    lose(malaiseOutcome) {
        const state = useStore.getState();
        const gameTree = state.gameTree;
        if(this.malaise){
            this.carrots = 1;
            this.sequelae = 3;

        } else {
            this.carrots = 0.1;
            this.sequelae = 15;
        }
        gameTree.insertNode(this.losingNodeToInsert);
        return;
    }

    //determine the correct ascending order 
    orderElements(elements){
        return elements.sort((a, b) => a.avgFreq - b.avgFreq);
    }

    // calculateOrderingChoices
    calculateOrderingChoices(correctOrder, numOrderingChoices) {
        //Not yet implemented
        let choices = [correctOrder];
        if(numOrderingChoices < 2){
            return choices;
        }
        for(let i = 1; i < numOrderingChoices; i++){
            const currentIndex = correctOrder[i];
            const remainingIndices = correctOrder.filter(index => index !== currentIndex);
            const remainingOrdersPermuted = this.calculateOrderingChoices(remainingIndices, numOrderingChoices - 1);
            for(const permutedOrder of remainingOrdersPermuted){
                choices.push([currentIndex, ...permutedOrder]);
            }
        }
        return choices;
    }
}

class FreqOrderingsGameElement {
    constructor(audio, numSamplesPerElement, minPlaybackDuration, maxPlaybackDuration){
        this.audio = audio;
        this.avgFreq = null;
        this.hue = null;
        this.numSamplesPerElement = numSamplesPerElement;
        this.minPlaybackDuration = minPlaybackDuration;
        this.maxPlaybackDuration = maxPlaybackDuration;
        this.orderingIndex = 0;
    }
    // TODO: implement methods:
    // mapAudioFreqsToEmFreqs
    mapAudioFreqAvgToHsv(audioFreqAvg){
       const minFrequency = 20;
       const maxFrequency = 20000;
       const hue = (Math.log2(audioFreqAvg/minFrequency)/Math.log2(maxFrequency/minFrequency))*360;
       return hue
    }

    convertHsvToRgb(h, s, v){
        let c = v * s;
        let hPrime = h/60;
        let x = c * (1 - Math.abs((hPrime % 2) - 1));
        let r, g, b;

        if(0 <= hPrime && hPrime < 1) [r, g, b] = [c, x, 0];
        else if (1 <= hPrime && hPrime < 2) [r, g, b] = [x, c, 0];
        else if (2 <= hPrime && hPrime < 3) [r, g, b] = [0, c, x];
        else if (3 <= hPrime && hPrime < 4) [r, g, b] = [0, x, c];
        else [r, g, b] = [c, 0, x];

        let m = v - c;
        return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];

    }

    convertRgbNumberToHex(color){
        return color.toString(16).padStart(2, '0');
    }

    convertHexTripleToString(r, g, b){
        const hexString = "#" + convertRgbNumberToHex(r) + convertRgbNumberToHex(g) + convertRgbNumberToHex(b);
        return hexString;
    }
 
    // getRawAudioElementData
    async getRawAudioElementFreqs(audioBuffer, startTime, duration){
        const fftSize = 2048;
        const sampleRate = audioBuffer.sampleRate;
        const frameCount = sampleRate * duration;
        const offlineCtx = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            frameCount,
            sampleRate
        )

        const analyser = offlineCtx.createAnalyser();
        analyser.fftSize = fftSize;

        const source = offlineCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(offlineCtx.destination);
        source.start(0, startTime, duration);

        const spectrum = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(spectrum);

        const frequencies = [];
        for(let i = 0; i < spectrum.length; i++){
            const frequency = i * sampleRate / analyser.fftSize;
            frequencies.push({frequency: frequency, magnitude: spectrum[i]});
        }
        return frequencies;

    }
    // getAverageAudioElementFreq
    getAverageAudioElementFreq(frequencies){
        const totalFrequency = frequencies.reduce((sum, freq) => sum + freq.frequency, 0);
        return totalFrequency / frequencies.length;
    }
    // generateAvgAudioFreqOsc
    renderAvgAudioFreqOsc(avgFreq, ctx){
        const osc = new OscillatorNode(ctx, {type: 'sine', frequency: avgFreq});
        return osc;
    }


    playAudioOscillator(osc, duration, ctx){
        const gainNode = new GainNode(ctx);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        setTimeout(() => {
            osc.stop();
        }, duration * 1000);
    }

    getOrderedNumberFromFreqAndHue(audioFreqAvg, hue){
        return audioFreqAvg**2 + hue;
    }

    createAVElement(audioBuffer, startTime, duration, ctx, index){
        const frequencies = this.getRawAudioElementFreqs(audioBuffer, startTime, duration);
        const avgFreq = this.getAverageAudioElementFreq(frequencies);
        const hue = this.mapAudioFreqAvgToHsv(avgFreq);
        const rgbColor = this.convertHsvToRgb(hue, 1, 1);
        const hexColor = this.convertHexTripleToString(...rgbColor);
        const osc = this.renderAvgAudioFreqOsc(avgFreq, ctx);
        return {index: index, oscillator: osc, color: hexColor, orderingValue: this.getOrderedNumberFromFreqAndHue(avgFreq, hue)};
    }
}