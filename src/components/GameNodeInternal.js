export class GameNodeInternal {
    constructor(imageUrl, audioUrl, videoUrl, value){
        this.imageUrl = imageUrl;
        this.audioUrl = audioUrl;
        this.videoUrl = videoUrl;
        this.value = value;
    }

    printValues() {
        console.log("image url: ", this.imageUrl, "audio url: ", this.audioUrl, "video url: ", this.videoUrl, "value: ", this.value);
    }
}