import Button from './Button';

export default function GameNode({value, imageUrl, audioUrl, videoUrl}){

    return (
        <div className={layoutMode}>
            <h1>{value}</h1>
            {<Button onClick={() => playAudio(audioUrl)} label="cochlear tickling" />}
            {imageUrl && <img src={imageUrl} alt={imageUrl.substring(imageUrl.lastIndexOf('/') + 1)} />}
            {videoUrl && <video src = {videoUrl} controls />}
        </div>
    )
}