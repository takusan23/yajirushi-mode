import { useState } from 'react'
import "./App.css"

function App() {
    const [count, setCount] = useState(5)

    return (
        <div className='flex flex-col space-y-2 items-center'>
            <h2 className='text-3xl'>Rectangle Creator</h2>
            <p>
                Count:
                <input
                    className='border-black border-b-2 ml-2'
                    onChange={(ev) => setCount(Number(ev.target.value))}
                    value={count} />
            </p>
            <button
                className='rounded-md border-blue-300 border-2 px-4'
                onClick={() => {
                    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
                }}
            >
                Create
            </button>

            <button
                className='rounded-md border-red-300 border-2 px-4'
                onClick={() => {
                    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
                }}
            >
                Cancel
            </button>
        </div>
    )
}

export default App