import React, { useState, useTransition } from 'react';


export default function FiberScheduler() {
    const [input, setInput] = useState('');
    const [items, setItems] = useState([]);
    const [isPending, startTransition] = useTransition();
    const handleInput = (e) => {
        setInput(e.target.value);
        startTransition(() => {
            const largeArray = Array.from({ length: 2000 }, (_, i) => `${e.target.value}`);
            setItems(largeArray);
        });
    };
    return (
        <div className="card">
            <input value={input} onChange={handleInput} placeholder="Type to benchmark Fiber" />
            {isPending && <span className="badge">Fiber Diffing in Background . </span>}
            <ul>{items.slice(0, 5).map((item, idx) => <li key={idx}>{item} </li>)} </ul>
        </div>
    );
}
