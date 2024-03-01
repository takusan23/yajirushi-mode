import useFigmaUiMessageHook from './hooks/useFigmaUiMessageHook'
import ArrowSetting from './components/ArrowSetting'
import SelectError from './components/SelectError'
import "./App.css"

function App() {
    const { message, postMessage } = useFigmaUiMessageHook()

    return (
        <div className='flex flex-col'>
            {/* <Title /> 出すスペースがない... */}
            {
                message?.event === 'select_node' && <ArrowSetting
                    startNode={message.startNode}
                    endNode={message.endNode}
                />
            }
            {
                message?.event === 'unselect_node' && <SelectError />
            }
        </div>
    )
}

export default App