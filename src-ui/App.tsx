import useFigmaUiMessageHook from './hooks/useFigmaUiMessageHook'
import ArrowSetting from './components/ArrowSetting'
import SelectError from './components/SelectError'
import "./App.css"

function App() {
    const { message } = useFigmaUiMessageHook()

    return (
        <div className='flex flex-col bg-background-light dark:bg-background-dark'>
            {/* <Title /> 出すスペースがない... */}
            {
                message?.event === 'select_node'
                    ? < ArrowSetting
                        startNode={message.startNode}
                        endNode={message.endNode}
                    />
                    : <SelectError />
            }
        </div>
    )
}

export default App