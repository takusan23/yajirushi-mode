import { useEffect, useState } from "react"
import FigmaUiMessageTool from "../tools/FigmaUiMessageTool"
import { MessageTypes, SelectNodes, UnSelectNodes } from "../../src-common/MessageTypes"
import { useTranslation } from "react-i18next"
import Setting from "../Setting"

/** エラー or 矢印線を書く画面 */
type ScreenState = SelectNodes | UnSelectNodes

/** {@link FigmaUiMessageTool}を React で使えるようにしたカスタムフック */
function useFigmaUiMessageHook() {
    // 言語変更
    const { i18n } = useTranslation()
    // Figma Plugin から来た最新のメッセージ
    const [message, setMessage] = useState<MessageTypes>()
    // 線を各画面が利用可能か、ノードを選択してないとかの場合は false
    const [screenState, setScreenState] = useState<ScreenState>({ event: 'unselect_node' })
    // 設定内容
    const [setting, setSetting] = useState<Setting>({})

    // メッセージを受け取る
    useEffect(() => {
        FigmaUiMessageTool.receiveMessage((receiveMessage) => {
            setMessage(receiveMessage)

            // それ以外に言語選択イベントとか来るので
            switch (receiveMessage.event) {
                // select_node or unselect_node 以外では更新しない
                case 'select_node':
                    setScreenState(receiveMessage)
                    break
                case 'unselect_node':
                    setScreenState(receiveMessage)
                    break

                // 設定内容を受け取る
                case 'storage_update_response':
                    const latestSetting = receiveMessage.value ? JSON.parse(receiveMessage.value) : {}
                    setSetting(latestSetting)
                    // 言語選択
                    i18n.changeLanguage(latestSetting.language)
                    break
            }
        })

        // 受け取る準備ができたので、設定内容をリクエストする
        FigmaUiMessageTool.postMessage({ event: 'storage_get_request' })
    }, [])

    /** 言語設定をする */
    function changeLanguage(lang: string) {
        const updatedSetting: Setting = {
            ...setting,
            language: lang
        }
        FigmaUiMessageTool.postMessage({ event: 'storage_set_request', value: JSON.stringify(updatedSetting) })
    }

    return {
        screenState,
        changeLanguage
    }
}

export default useFigmaUiMessageHook