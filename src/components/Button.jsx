export default function Button({ onClick, label, id, disabled = false, type = "button" }) {
    return (
        <button id={id} type={type} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}