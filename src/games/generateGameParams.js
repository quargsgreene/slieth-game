const generateGameParams = (game) => { 
    switch(game){
        case 'FreqOrderings':
            return {
                numElements: 4,
                numOrderingChoices: 4,
                losingNodeToInsert: {
                    imageUrl: null,
                    audioUrl: null,
                    videoUrl: null,
                    value:0
                },
                elementParams: {
                    audio: null,
                    numSamplesPerElement: null,
                    minPlaybackDuration: null,
                    maxPlaybackDuration: null
                }
            }
        case 'Tingle':
            return {
                numInteroceptiveTopics: 3,
                minNodes: 5,
                maxNodes: 20,
                keyIncreasePerNode: 10
            }
        case 'CountAndFeelChars':
            const countAndFeelCharsParams = {
                maxRounds: Math.ceil(5 * Math.random()),
                asciiRange: {
                    min: 32 + Math.floor(95 * Math.random()),
                    max: Math.max(32 + Math.floor(95 * Math.random()), 126 - Math.floor(95 * Math.random()))
                },
                minChars: 20 + Math.floor(81 * Math.random()),
                maxChars: Math.max(20 + Math.floor(81 * Math.random()), 100 - Math.floor(81 * Math.random()))
            }
            return countAndFeelCharsParams;
        default:
            throw new Error(`Unknown game: ${game}`);
    }
}

export default generateGameParams;