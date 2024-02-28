import { useState } from 'react'

function App() {
    const [count, setCount] = useState(5)

    return (
        <>
            <h2>Rectangle Creator</h2>
            <p>
                Count:
                <input
                    onChange={(ev) => setCount(Number(ev.target.value))}
                    value={count} />
            </p>
            <button
                onClick={() => {
                    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
                }}
            >
                Create
            </button>

            <button
                onClick={() => {
                    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
                }}
            >
                Cancel
            </button>
        </>
    )
}

export default App