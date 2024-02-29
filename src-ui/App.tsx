import useFigmaUiMessageHook from './useFigmaUiMessageHook'
import Title from './components/Title'
import ArrowSetting from './components/ArrowSetting'
import "./App.css"

function App() {
    const { message, postMessage } = useFigmaUiMessageHook()

    return (
        <div className='flex flex-col'>
            <Title />
            {
                message?.event === 'select_node' && <ArrowSetting
                    firstNode={message.firstNode}
                    secondNode={message.secondNode}
                    onCreateArrow={(message) => postMessage(message)}
                />
            }
        </div>
    )
}

export default App