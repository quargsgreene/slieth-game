'use client';

export default function FormField({ label='', type='text', name='', onChange=() => {}, onSubmit=() => {} }) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} onChange={onChange} onSubmit={onSubmit}/>
        </div>
    );
}   