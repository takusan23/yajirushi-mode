import useFigmaUiMessageHook from './hooks/useFigmaUiMessageHook'
import Title from './components/Title'
import ArrowSetting from './components/ArrowSetting'
import "./App.css"
import SelectError from './components/SelectError'

function App() {
    const { message, postMessage } = useFigmaUiMessageHook()

    return (
        <div className='flex flex-col'>
            <Title />
            {
                message?.event === 'select_node' && <ArrowSetting
                    firstNode={message.firstNode}
                    secondNode={message.secondNode}
                />
            }
            {
                message?.event === 'unselect_node' && <SelectError />
            }
        </div>
    )
}

export default App