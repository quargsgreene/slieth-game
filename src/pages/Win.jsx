export default function Win(reason) {
    return (
        <div className="win-condition">
            <h1>This user has achieved symbolic interoceptive enlightenment!</h1>
            <p>{!reason.status && reason.reason}</p>
        </div>
    );
}