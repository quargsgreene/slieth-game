
export default function Lose(reason) {
    return (
        <div className="lose-condition">
            <h1>This user has been yeeted.</h1>
            <p>{!reason.status && reason.reason}</p>
        </div>
    );
}