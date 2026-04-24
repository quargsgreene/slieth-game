export default function Button({ onClick, label, id }) {
    return (
        <button id={id} onClick = {onClick}>{label}</button>
    )
}