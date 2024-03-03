import useFigmaUiMessageHook from './hooks/useFigmaUiMessageHook'
import ArrowSetting from './components/ArrowSetting'
import SelectError from './components/SelectError'
import TopBar from './components/TopBar'
import "./App.css"
import "./i18n"

function App() {
    const { screenState, setting, changeLanguage, postCreateArrow } = useFigmaUiMessageHook()
    return (
        <div className='flex flex-col bg-background-light dark:bg-background-dark'>
            {/* 一番上のバー */}
            <TopBar onLangChange={changeLanguage} />

            {
                // 2つ図形を選んでいれば編集画面、それ以外はエラー画面
                screenState.event === 'select_node'
                    ? <ArrowSetting
                        arrowSetting={setting.arrowSetting}
                        startNode={screenState.startNode}
                        endNode={screenState.endNode}
                        onCreateArrowRequest={postCreateArrow}
                    />
                    : <SelectError />
            }
        </div>
    )
}

export default App