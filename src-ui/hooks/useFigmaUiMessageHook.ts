import { useEffect, useState } from "react"
import FigmaUiMessageTool from "../tools/FigmaUiMessageTool"
import { MessageTypes } from "../../src-common/MessageTypes"

/** {@link FigmaUiMessageTool}を React で使えるようにしたカスタムフック */
function useFigmaUiMessageHook() {

    // メッセージを受け取る
    const [message, setMessage] = useState<MessageTypes>()
    useEffect(() => {
        FigmaUiMessageTool.receiveMessage((receiveMessage) => {
            setMessage(receiveMessage)
        })
    }, [])

    /** {@link MessageTypes}を Figma プラグインへ送る */
    function postMessage(message: MessageTypes) {
        FigmaUiMessageTool.postMessage(message)
    }

    return {
        message,
        postMessage
    }
}

export default useFigmaUiMessageHook